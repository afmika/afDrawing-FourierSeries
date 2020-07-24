const links = [
    {
        text : "Phasor animation", 
        value : "./phasor-example.html"
    },
    {
        text : "Drawing with a 1D Fourier transform", 
        value : "./drawing-with-a-1D-DFT.html"
    },
    {
        text : "Drawing with a 2D Fourier transform", 
        value : "./drawing-with-a-2D-DFT.html"
    }
];

links.forEach(link => {
    document.querySelector("#link_list").innerHTML +=
    `<a href="${link.value}">
        <button class="btn btn-primary btn-lg btn-block" type="button">
            ${link.text}
        </button>
        <br/>
    </a>`;
});