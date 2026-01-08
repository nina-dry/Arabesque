fetch('../components/header.html')
    .then(r => r.text())
    .then(data => { document.getElementById('header').innerHTML = data; });

fetch('../components/navigation.html')
    .then(r => r.text())
    .then(data => { document.getElementById('navigation').innerHTML = data; });