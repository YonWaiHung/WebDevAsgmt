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
    
    errorMsg = document.getElementById('errorMsg');
    continueBtn = document.getElementById('continue');
    
    // actions when proceed btn is clicked
    continueBtn.addEventListener('click', () => {
        //get entered card number, expiry date & cvv code
        cardNum = document.getElementById('cardNo').value;
        selectedMonth = document.getElementById('month').value;
        selectedYear = document.getElementById('year').value;
        cvv = document.getElementById('cvv').value;

        //Identify and point out unfilled details
        if (cardNum == '' || selectedMonth == -1 || selectedYear == -1 || cvv == '') {
            if (errorMsg.id === 'errorMsg') {
                errorMsg.id = 'errorMsgOccured'; // change errorMsg ID to errorMsgOccured
                // change ID name to "errorMsgOccured" which triggers CSS function designated for that ID
            } 
            document.getElementById(errorMsg.id).innerHTML = "Please fill in all of your payment details";
        } 
        else {
            //Check if card details pass verification
            if (checkCardNum(cardNum) && checkExpiryDate(selectedMonth, selectedYear) && checkCVV(cvv)) {
                //Send POST Request with entered card details
                let cardData = JSON.stringify({
                    master_card: cardNum,
                    exp_year: selectedYear,
                    exp_month: selectedMonth,
                    cvv_code: cvv
                });
                console.log(cardData);
                fetch("https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard", {
                    method: "POST",
                    body: cardData,
                    //Specify data type it is sending i.e. JSON
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })

                //Get response from the POST Request
                .then((response) => {
                    //Check if the response status is 200(meaning OK)
                    if (response.status == 200){
                        //Store user input card number to local storage
                        response.json().then((json) => {
                            console.log(json);
                            localStorage.setItem("CardNumStorage", json.data.master_card);
                        });
                        location.href = "success.html";
                    } 
                    //Check if the response status is 400(meaning meaning bad request made to server)
                    else if (response.status == 400){ 
                        if (errorMsg.id === "errorMsg") {
                            errorMsg.id = "errorMsgOccured"; 
                        } 
                        document.getElementById(errorMsg.id).innerHTML = "Bad Request to server. Please Try Again.";
                    }
                })  
                .catch((error)=> {
                    alert(error);
                })              
            } 
            
            else { //When card details are incorrect
                if (errorMsg.id === 'errorMsg') {
                    errorMsg.id = 'errorMsgOccured'; 
                } 
                document.getElementById(errorMsg.id).innerHTML = "Incorrect/invalid details. Please try again";
            }
        }
        
    })

    //Function for validating card number
    const checkCardNum = () => { 
        //Master Card pattern
        pattern = /^5[1-5][0-9]{14}$/;
        if (cardNum.match(pattern)) return true;
        else return false;
    }

    //Function for validating card expiry date
    const checkExpiryDate = () => { 
        //Get current month & year
        const today = new Date();
        const mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();

        if (yyyy < selectedYear || (yyyy == selectedYear && mm < selectedMonth)) return true;
        else  return false;
    } 

    //Function for validating CVV code
    const checkCVV = () => {
        pattern = /^[0-9]{3,4}$/;
        if (cvv.match(pattern)) return true;
        else return false;
    }
}