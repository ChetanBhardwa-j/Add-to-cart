import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBuuJ7VEcyPwvt3ZW-oJT9ny-1U3Ld9ZyM",
  authDomain: "realtime-database-e2827.firebaseapp.com",
  databaseURL:
    "https://realtime-database-e2827-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "realtime-database-e2827",
  storageBucket: "realtime-database-e2827.appspot.com",
  messagingSenderId: "111071388416",
  appId: "1:111071388416:web:6f0f038a6ea9b877ba49e5",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const shoppingListInDB = ref(database, "shoppingList");

const inputEl = document.getElementById("input-text");
const addItemToCartEl = document.getElementById("btn-add");
const shoppingListEl = document.getElementById("list-items");

addItemToCartEl.addEventListener("click", function () {
  let inputvalue = inputEl.value;
  push(shoppingListInDB, inputvalue);
  // shoppingListEl.innerHTML += `<li>${inputvalue}</li>`;
  clearInputFieldEl();
  // clearshoppingListEl();
});

onValue(shoppingListInDB, function (snapshot) {
  // if (snapshot.exist()) {
  let itemArray = Object.entries(snapshot.val());
  clearshoppingListEl();
  for (let i = 0; i < itemArray.length; i++) {
    let currentItem = itemArray[i];
    let currentItemID = currentItem[0];
    let currentItemValue = currentItem[1];
    appendItemToShoppingListEl(currentItem);
  }
  //   } else {
  //     shoppingListEl.innerHTML = "No item here... yet";
  // }
});

function clearshoppingListEl() {
  shoppingListEl.innerHTML = "";
}

function clearInputFieldEl() {
  inputEl.value = "";
}

function appendItemToShoppingListEl(item) {
  let itemID = item[0];
  let itemValue = item[1];
  let newEl = document.createElement("li");

  newEl.textContent = itemValue;

  newEl.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
    remove(exactLocationOfItemInDB);
    newEl.remove();
  });
  shoppingListEl.append(newEl);
}
