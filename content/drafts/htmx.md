- замена сордимого ответом


Написать что-то про htmx
Типовой юзкейс отправка запроса и замена хтмл ответом 
<form hx-post="/todo/create" hx-target=".todo-list" hx-swap="appendChild">
<input name="title">
<button>create</button>
</form>


https://stackoverflow.com/questions/70043237/how-do-we-make-a-htmx-response-trigger-a-form-reset