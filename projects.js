fetch("projects.json")

.then(response => response.json())

.then(projects => {


const container = document.getElementById(
"project-container"
);



projects.forEach(project => {



const card = document.createElement("div");


card.className = "project-card";



card.innerHTML = `

<div class="code">

X∞-${project.id}

</div>



<h3>

${project.title}

</h3>



<h4>

${project.category}

</h4>



<p>

${project.description}

</p>



<span>

${project.status}

</span>

`;



container.appendChild(card);



});


})



.catch(error => {


console.error(

"Errore caricamento database progetti:",

error

);


});
