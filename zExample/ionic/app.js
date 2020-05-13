
const reasonInput = document.querySelector("#input-reason");
const amountInput = document.querySelector("#input-amount");
const cancelBtn = document.querySelector("#btn-cancel");
const confirmBtn = document.querySelector("#btn-confirm");
const expensesList = document.querySelector("#expenses-list");
const totalExpensesOutput = document.querySelector("#total-expenses");
const alertCtrl = document.querySelector("ion-alert-controller");

let totalExpenses = 0;

const clear = () => {
    reasonInput.value = "";
    amountInput.value = "";
}

// confirmBtn.addEventListener('click', () => {
//     const enteredReason = reasonInput.value;
//     const enteredAmount = amountInput.value;

//     if (enteredReason.trim().length <= 0 || enteredAmount <= 0 || enteredAmount.trim().length <= 0) {
//         alertCtrl.create({
//             message: 'Please enter a valid reason and amount!',
//             header: 'Invalid inputs',
//             buttons: ['Okey']
//         }).then(alertElement => {
//             alertElement.present();
//         });
//         return;
//     }

//     const newItem = document.createElement("ion-item");
//     newItem.textContent = enteredReason + ': $' + enteredAmount;

//     expensesList.appendChild(newItem);

//     totalExpenses += +enteredAmount;
//     totalExpensesOutput.textContent = totalExpenses;

//     clear();

// });

// cancelBtn.addEventListener('click', clear);



console.log('window Phaser:', Phaser);
console.log('window PhaserGUIAction:', window.PhaserGUIAction);
console.log('window.PhaserGUI:', window.PhaserGUI);

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: {
        create: create,
    }
};

var game = new Phaser.Game(config);

function create() 
{
    //  Default text with no style settings
    this.add.text(100, 100, 'Phaser');

    //  Pass in a basic style object with the constructor
    this.add.text(100, 200, 'Phaser', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });

    //  Or chain calls like this:
    this.add.text(100, 400, 'Phaser').setFontFamily('Arial').setFontSize(64).setColor('#ffff00');
  
    PhaserGUIAction(this);
}
