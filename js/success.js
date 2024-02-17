window.onload = () => {
    
    const drop = document.getElementById("dropdownM");

    // Show/Hide dropdown content when the menu bar/icon is pressed
    drop.addEventListener('click', () => {
        let dropdown = document.getElementById("dropdownM");
        if (dropdown.className === "dropdownMenu") {
            dropdown.className += " responsive"; // change dropdown menu class name by adding responsive
            // change class name to "dropdownMenu responsive" which fullfill condition of a @media function part in CSS
        } else {
            dropdown.className = "dropdownMenu";
            // change class name back to dropdownMenu, turning aesthetics & function back to desktop ver
        }
    })

    //Get and split user's card number individually
    let cardNum = localStorage.getItem("CardNumStorage").split('');

    //Select & display digits of the card starting from the last four
    backNum = '';
    for (i=0; i < 4; i++){
        n = 12+i;
        document.getElementById('msg').innerHTML += cardNum[n];
    }

    document.getElementById('msg').innerHTML += " is a success"; 
    
}