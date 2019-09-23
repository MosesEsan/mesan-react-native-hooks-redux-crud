# Tutorial 2a: How to add CRUD operations to your React Native app using React Hooks and Redux

### Demo
![Demo](https://github.com/MosesEsan/mesan-react-native-hooks-redux-boilerplate/blob/master/demo.gif "demo")

### Tutorial
<ul>
  <li><a href="#step5">Step 5: Create the Actions</a></li>
  <li><a href="#step6">Step 6: Create the Reducer</a></li>
</ul>

###  FOLLOW Step 1 to 3 in <a href="https://medium.com/mesan-digital/tutorial-1c-adding-navigation-to-your-react-native-app-1716b5de722e">Tutorial 1c</a>(Don't create the instructions.json file, create a sample.json file instead)

<a name="step4"></a>
### Step 4: Create Sample Data
You can either create a local json file with your sample data or use the Axios package to make an api request to <a href="https://my-json-server.typicode.com/mesandigital/demo/quotes">https://my-json-server.typicode.com/mesandigital/demo/quotes</a> to access the data.

<a name="step5"></a>
### Step 5: Create the Actions

<b>ADD_QUOTE</b><br>
This action is the  CREATE operation, the new quote is passed to the addQuote function.

<b>QUOTES_AVAILABLE</b><br>
This action will act as the READ operation, the quotes are passed to the addQuotes function.

<b>UPDATE_QUOTE</b><br>
This action is the UPDATE operation, the updated quote is passed to the updateQuote function. 

<b>DELETE_QUOTE</b><br>
This action is the DELETE operation, the deleted quote id is passed to the deleteQuote function.


<a name="step5"></a>
### Step 5: Create the Reducer

<b>ADD_QUOTE</b><br>
The state 'quotes' variable is cloned and the new quote is pushed to the top of the cloned object, the state 'quotes' variable is replaced with the clone object.

<b>QUOTES_AVAILABLE</b><br>
The state 'quotes' variable is updated with the quotes array dispatched to the reducer.

<b>UPDATE_QUOTE</b><br>
The state 'quotes' variable is cloned, the id of the quote dispatched to the reducer is used to find the index of the quote in the cloned object. 
The quote at that index is replaced with the quote dispatched to the reducer. The state 'quotes' variable is replaced with the clone object.

<b>DELETE_QUOTE</b><br>
The state 'quotes' variable is cloned, the id dispatched to the reducer is used to find the index of the quote in the cloned object.
The quote at that index is removed and the state 'quotes' variable is replaced with the clone object.

###  FOLLOW Step 7 in <a href="https://medium.com/mesan-digital/tutorial-1c-adding-navigation-to-your-react-native-app-1716b5de722e">Tutorial 1c</a> to create the Redux Store.



The rest of the tutorial is available on my <a href="https://medium.com/mesan-digital/tutorial-2a-how-to-add-crud-operations-to-your-react-native-app-using-react-hooks-and-redux-5896ebab89ea" target="_blank">blog</a>.
