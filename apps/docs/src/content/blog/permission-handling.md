---
title: What's the best way to handle roles & permissions?
description: What is RBAC and why did we switch to it?
publicationDate: 2025-04-06
---
The most intuitive approach to implementing a permission based authorization systems is to use conditional statements. In Kai, we have three roles:
```typescript
"admin", "professor", "student"
```
These roles are quite intuitive as far as what permissions each should be allocated. For example, a user with role `admin` can do basically everything such as adding/removing any user from ALL courses. Whereas a user with role `professor` can only add/remove users from courses which they are teaching. In our database design, we only ever have users with the role `student` as formally *enrolled* in a course. Let's now consider one permission guarded action.
## Editing Comments

We want to allow users to edit and delete their own comments. 

*Note: we don't actually compare userIds directly in Kai since we want to ensure anonymity of our platform. UserIds are not exposed anywhere on the client.*

In our `PATCH api/comments/` controller we can put the following:
```typescript
if (req.user.uid === comment.userId ) {
	// Grant access
}
```
We also want to allow users with the `admin` role to be able to edit and delete any comment made by any other user.
```typescript
if (req.user.role ===  'admin') {
	// Grant access
}
```
Users with the `professor` role should be able to delete any comments made by users in their course. This requires multiple checks. We need to ensure that
1. The requesting user has role `professor`
2. The comment was posted in a course taught by this user
```typescript
if (req.user.role === "professor" && comment.courseId === course._id && course.professor === req.user.uid) {
	// Grant access
}
```

Combining all of these checks results in the following code:
```typescript
if (req.user.role === "student" && req.user.uid === comment.userId ) {
	// Grant access
} else if (req.user.role === "professor" && course.professor === req.user.uid && comment.courseId == course._id) {
	// Grant access
} else if (req.user.role === "admin") {
	// Grant access
}
```
which isn't that bad honestly. 

But we do have to repeat this permission check many times over the multiple controllers that we have. For example, we pretty much repeat this code in our controller which handles editing and deletion of posts as well as editing of comments. 

Deleting Post:
```typescript
if (req.user.role === "student" && req.user.uid === post.userId ) {
	// Grant access
} else if (req.user.role === "professor" && course.professor === req.user.uid && comment.courseId == course._id) {
	// Grant access
} else if (req.user.role === "admin") {
	// Grant access
}
```

This gets old quickly. On top of that, what if we further increase our logic complexity in the future? Not only will the conditionals become more convoluted, we will also have to update this across each controller. 

## RBAC

Introducing RBAC which stands for **Role Based Access Control**. We can instead abstract all of this logic to a centralized place. For example, it may look something like this:
```typescript
const PERMISSIONS = {
    admin: [
        "view:comments",
        "create:comments",
        "update:comments",
        "delete:comments",
    ],
    professor: [
        "view:comments",
        "create:comments",
        "delete:comments",
    ],
    student: [
        "view:comments",
        "create:comments",
    ],
}

type IUser = InferSchemaType<typeof User.schema>;

export const hasPermission = (user: HydratedDocument<IUser>, action: string, resource: string) => {
	const permissions = PERMISSIONS[user.role];
	if (!permissions) return false;

	return permissions.includes(`${action}:${resource}`);
};
```
Now when we can check if a user has the permissions to perform an action on a given resource. 

`hasPermission(user, "delete", "comments")`

However, if we think about this a bit harder, we might notice that we're actually missing some details.

Remember that users are allowed to edit/delete their own comments. How can we represent this? Well, we could do this.
```typescript
const PERMISSIONS = {
    admin: [
        "view:comments",
        "create:comments",
        "update:comments",
        "delete:comments",
    ],
    professor: [
        "view:comments",
        "create:comments",
		"update:ownComments",
        "delete:comments",
    ],
    student: [
        "view:comments",
        "create:comments",
		"update:ownComments",
		"delete:ownComments",
    ],
}
```
That seems to fix it... but there's still something wrong. Remember that professors are only allowed to delete the comments **which belong to a course that they are teaching**. Students are also only able to view/create comments in courses they are registered for. Let's update it one more time.
```typescript
const PERMISSIONS = {
    ...
    professor: [
        "view:comments",
        "create:comments",
		"update:ownComments",
        "delete:courseComments",
    ],
	...
	student: [
		"view:registeredCourseComments",
        "create:registeredCourseComments",
		"update:ownComments",
		"delete:ownComments",
	]
}
```

So are we done now? Well let's try and add all of our **action** and **resource** pairs. 

```typescript
const PERMISSIONS = {
    admin: [
        "view:comments",
        "create:comments",
        "update:comments",
        "delete:comments",
		"view:posts",
        "create:posts",
        "update:posts",
        "delete:posts",
		"view:users",
		"create:users",
		"update:users",
		"delete:users",
    ],
    professor: [
        "view:courseComments",
        "create:courseComment",
		"update:ownComments",
        "delete:courseComments",
		"view:coursePost"
		"create:coursePost"
		"update:ownPosts",
        "delete:coursePosts",
		"view:courseUsers",
		"create:courseUsers",
		"update:courseUsers",
    ],
    student: [
        "view:courseComments",
        "create:courseComments",
		"update:ownComments",
		"delete:ownComments",
		"view:coursePosts",
        "create:coursePosts",
        "update:ownPosts",
        "delete:ownPosts",
    ],
}
```
Ok. I didn't include everything but this is awful. The first noticeable issue is how many possible tuples we can have of **action** **x** **resource**.
There's other issues as well.

1. We have to manually provide every possible pair since a wild card like
`manage:users` won't work since we're doing a raw membership check.
2. Since we're dealing with raw strings so the likelihood of typos is very high (did you see any? There's multiple). There also isn't anything logically enforcing that `coursePosts` is a subset of `posts`. If a user can `view:posts` then automatically they can `view:coursePosts`. But if we evaluate `hasPermission(someAdmin, "view", "coursePosts")` this will return `false` in our current state since we need to explicitly specify it. 
3. Resource naming will become increasingly more complicated with more specific conditions. These string names will also be on us, the developer, to remember. With each subset of resources i.e. `courseComments` to `comments`, we will have to specify all new pairs for roles with access to the parent set.

So is there anything we can do that can still abstract away permissions while being manageable for development?

### Introducing CASL

...
