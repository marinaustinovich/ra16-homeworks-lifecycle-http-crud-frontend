[![Build status](https://ci.appveyor.com/api/projects/status/eioway3u23gx8676/branch/main?svg=true)](https://ci.appveyor.com/project/marinaustinovich/ra16-homeworks-lifecycle-http-crud/branch/main)

deployment: https://marinaustinovich.github.io/ra16-homeworks-lifecycle-http-crud/

CRUD
===

Вам необходимо реализовать базовый CRUD без обновления при работе с HTTP.

Backend вы можете либо написать сами, либо взять готовый из каталога `backend`.

![CRUD](./public/crud.png)

## Общая механика

Первоначальная загрузка: делается http-запрос GET на адрес http://localhost:7070/notes, полученные данные отображаются в виде карточек с возможностью удаления.

Добавление:
1. Вы заполняете форму и нажимаете кнопку «Добавить».
1. Выполняется http-запрос POST на адрес http://localhost:7070/notes, в теле запроса передаётся следующий JSON:
```json
{
    "id": 0,
    "content": "То, что было введено в поле ввода"
}
```
3. После чего делается запрос на получение всех записей и происходит обновление списка — GET http://localhost:7070/notes.

Удаление:
1. Вы нажимаете на крестик на одной из карточек.
1. Выполняется http-запрос DELETE на адрес http://localhost:7070/notes/{id}, где id — это идентификатор заметки.
1. После чего делается запрос на получение всех записей и происходит обновление списка — GET http://localhost:7070/notes.

Обновление:
1. Вы нажимаете на кнопку «Обновить» — две зелёные стрелочки.
1. После чего делается запрос на получение всех записей и происходит обновление списка — GET http://localhost:7070/notes.