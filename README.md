# SnoreMax

The Tired Boyz try their hand at making a pokemon themed API

/_ Form Styles - Move search form _/
#addPokemonForm {
display: flex; /_ Sets the layout as a flex container _/
flex-direction: column; /_ Arranges items in a column _/
align-items: flex-start; /_ Aligns form elements to the left _/
justify-content: center; /_ Centers items vertically _/
gap: 20px; /_ Adds space between items _/
position: absolute; /_ Allows precise positioning _/
top: 350px; /_ Positions the form 350px from the top _/
left: 10%; /_ Moves the form closer to the left edge _/
transform: none; /_ Removes horizontal centering transformation _/
width: 480px; /_ Sets the width of the form _/
}

/_ Input Field Styles _/
#pokemonName {
width: 90%; /_ Sets the input field width to 90% of its parent _/
padding: 10px; /_ Adds padding inside the input field _/
font-size: 18px; /_ Sets the font size for the text _/
text-align: center; /_ Centers text within the input _/
border: 2px solid #fff; /_ Adds a white border _/
border-radius: 8px; /_ Rounds the corners of the input field _/
position: absolute; /_ Allows precise positioning _/
top: -180px; /_ Positions the input field 50px from the top _/
left: 150%; /_ Positions the input horizontally at the center _/
transform: translateX(-50%); /_ Centers the input field horizontally _/
}

/_ Search Button Styles _/
#submitBtn {
background-color: #1e88e5; /_ Sets the button's background color _/
border-radius: 10%;
color: white; /_ Sets the text color to white _/
border: none; /_ Removes the border _/
padding: 12px 24px; /_ Adds padding around the button text _/
width: 135px;
font-size: 16px; /_ Sets the font size for the button _/
font-weight: bold;
cursor: pointer; /_ Changes the cursor to a pointer on hover _/
border-radius: 8px; /_ Rounds the corners of the button _/
position: absolute; /_ Allows precise positioning _/
top: 50px; /_ Positions the button 150px from the top _/
left: 38%; /_ Positions the button horizontally at the center _/
transform: translateX(-50%); /_ Centers the button horizontally _/
}

#submitBtn:hover {
background-color: #0b6ab8; /_ Changes the background color on hover _/
}

/_ Pokémon List - Move list and buttons to the right _/
#pokemonList {
margin-top: 30px; /_ Adds space above the list _/
display: flex; /_ Sets the layout as a flex container _/
flex-direction: column; /_ Arranges list items in a column _/
gap: 10px; /_ Adds space between list items _/
align-items: flex-start; /_ Aligns list items to the left _/
position: absolute; /_ Allows precise positioning _/
top: 275px; /_ Positions the list 275px from the top _/
right: 330px; /_ Moves the list closer to the right edge _/
}

/_ Pokémon Button Styles _/
.pokemon-button {
background-color: #09a91f; /_ Sets the button's background color _/
border: 1px solid black; /_ Adds a green border _/
color: white; /_ Sets the text color to white _/
padding: 10px 24px; /_ Adds padding around the button text _/
cursor: pointer; /_ Changes the cursor to a pointer on hover _/
text-align: center; /_ Centers the text _/
border-radius: 8px; /_ Rounds the corners of the button _/
font-size: 16px; /_ Sets the font size for the button _/
width: 350px; /_ Sets a uniform width for the buttons _/
}

/_ Navigation Buttons for List - Keep the style and position _/
#movebutton {
display: flex; /_ Sets the layout as a flex container _/
justify-content: flex-start; /_ Aligns buttons to the left within the container _/
gap: 33px; /_ Adds space between the buttons _/
margin-top: 20px; /_ Adds space above the buttons _/
position: absolute; /_ Allows precise positioning _/
top: 605px; /_ Positions the buttons 450px from the top _/
right: 275px; /_ Moves the buttons closer to the right edge _/
}

#movebutton button {
background-color: #ffffff; /_ Sets the button's background color _/
color: black; /_ Sets the text color to white _/
border: none; /_ Removes the border _/
padding: 10px 20px; /_ Adds padding around the button text _/
font-size: 16px; /_ Sets the font size for the button _/
cursor: pointer; /_ Changes the cursor to a pointer on hover _/
border-radius: 8px; /_ Rounds the corners of the button _/
width: 135px;
}

#movebutton button:hover {
background-color: #0b6ab8; /_ Changes the background color on hover _/
}

/_ Modal Styles _/
dialog {
display: none; /_ Hides the modal by default _/
position: center; /_ Centers the modal in the viewport _/
width: 100%; /_ Sets the modal's width to the full viewport _/
height: 100%; /_ Sets the modal's height to the full viewport _/
background-color: rgba(
0,
0,
0,
0.7
); /_ Adds a semi-transparent dark background _/
justify-content: center; /_ Centers modal content horizontally _/
align-items: center; /_ Centers modal content vertically _/
padding: 20px; /_ Adds padding inside the modal _/
z-index: 1000; /_ Ensures the modal is on top of other content _/
}

.modal-content {
background-color: white; /_ Sets the modal's background color _/
padding: 20px; /_ Adds padding inside the modal _/
border-radius: 8px; /_ Rounds the corners of the modal _/
position: relative; /_ Allows child elements to be positioned relative to the modal _/
width: 500px; /_ Sets the width of the modal content _/
height: 500px;
text-align: center; /_ Centers text inside the modal _/
/_ left: %; _/
top: 16%;
}

/_ Pokémon Image Styling _/
#pokemonImage {
width: 200px; /_ Sets the image width to 200px _/
height: 200px; /_ Sets the image height to 200px _/
object-fit: contain; /_ Ensures the image fits without distortion _/
}

/_ Pokémon Display Styling _/
h2 {
font-family: sans-serif; /_ Sets a sans-serif font for headings _/
margin-bottom: 10px; /_ Adds space below the heading _/
}

/_ Ensure the dialog is not hidden by default _/
dialog {
display: none; /_ Hidden by default _/
}

dialog[open] {
display: block; /_ Displays dialog when 'open' attribute is added _/
}
