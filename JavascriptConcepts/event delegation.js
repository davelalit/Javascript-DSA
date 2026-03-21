/*
Event bubbling is the default behavior where an event on a child element propagates up through its ancestors in the DOM.
 Event delegation is a technique that leverages this bubbling to handle events for multiple child elements with a single listener on a parent element, 
 which improves performance and reduces redundant code.

Key Differences -

Feature 	              Event Bubbling (default behavior)                 	Event Delegation (technique)
Listener Location	      Attached to individual child elements	                Attached to a single parent element
Performance	              Less performant with many elements (many listeners)	More performant (fewer listeners)
Dynamic Content	          New elements need listeners added manually	        Works automatically for dynamically added children
Mechanism	             Event propagates from target up the DOM	            Leverages bubbling; uses event.target to identify the source
*/


/*
Event Bubbling Example:

<body onclick="console.log('Body clicked');">
  <div onclick="console.log('Div clicked');">
    <button onclick="console.log('Button clicked');">
      Click me!
    </button>
  </div>
</body>
*/

/*
Event Delegation Example:

<ul id="item-list">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
*/

const itemList = document.getElementById('item-list');

itemList.addEventListener('click', function(event) {
  // Check if the clicked target is a list item (LI)
  if (event.target && event.target.tagName === 'LI') {
    console.log('You clicked on ' + event.target.textContent);
    // You can add further actions here, e.g., highlight the item
    event.target.style.backgroundColor = 'yellow';
  }
});