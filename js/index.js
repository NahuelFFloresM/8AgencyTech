document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('submit_webinar_form').addEventListener('submit', function (event){
        event.preventDefault();
        document.getElementById('screen_grey').classList.toggle('hidden');
    });
});