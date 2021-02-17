call plug#begin('c:\users\preci\.vim\plugins')

Plug 'lervag/vimtex'

call plug#end()

" Editor settings
set encoding=utf-8
set relativenumber number
set signcolumn=no
syntax on
set hidden
set belloff=all
set guicursor=a:blinkon0
set noshowmode
set noruler
set laststatus=0
set noshowcmd
set cmdheight=1

" Tabs
set tabstop=4     " Tab characters appear n-spaces-wide
set shiftwidth=4  " The size of an indent
set expandtab "converts tabs to spaces
set cb=unnamed
set backspace=indent,eol,start

let &t_ti.="\e[1 q"
let &t_SI.="\e[5 q"
let &t_EI.="\e[1 q"
let &t_te.="\e[0 q"
inoremap { {}<Left>
inoremap {<CR> {<CR>}<Esc>O
inoremap {{ {
inoremap {} {}
autocmd InsertEnter * :set norelativenumber
autocmd InsertLeave * :set relativenumber 
autocmd filetype cpp nnoremap <F1> :w <bar> exec '!g++ -std=c++14 ' .shellescape('%').' -o '.shellescape('%:r').' && ./'.shellescape('%:r')<CR>
autocmd filetype python nnoremap <F1> :w <bar> exec '!python '.shellescape('%')<CR>
nnoremap <F2> :%y+ <CR>
au GUIEnter * simalt ~x
