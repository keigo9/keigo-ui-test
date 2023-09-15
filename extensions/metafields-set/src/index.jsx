import React, { useState } from "react";
import {
  render,
  TextField,
  BlockStack,
  useApplyMetafieldsChange,
  useMetafield,
  Checkbox,
} from '@shopify/checkout-ui-extensions-react';

// render('Checkout::CustomerInformation::RenderAfter', () => <App />);
render('Checkout::Contact::RenderAfter', () => <App />);
render('Checkout::Dynamic::Render', () => <App />);

function App() {
  // Set up the checkbox state
  const [checked, setChecked] = useState(false);

  // Define the metafield namespace and key
  const metafieldNamespace = "customer";
  const metafieldKey = "letter-test";

  // Get a reference to the metafield
  const deliveryInstructions = useMetafield({
    namespace: metafieldNamespace,
    key: metafieldKey,
  });

  // Set a function to handle updating a metafield
  const applyMetafieldsChange = useApplyMetafieldsChange();

  // Set a function to handle the Checkbox component's onChange event
  const handleChange = (value) => {
    setChecked(!checked);
    const valString = value.toString();
    console.log(valString)
    console.log(typeof valString)
    // Apply the change to the metafield
    applyMetafieldsChange({
      type: "updateMetafield",
      namespace: metafieldNamespace,
      key: metafieldKey,
      valueType: "string",
      value: valString,
    }).then((res) => {
      console.log(res)
    });
   
    //console.log(value)
  };

  // Render the extension components
  return (
    <BlockStack>
      <Checkbox checked={checked} onChange={handleChange} id="letter-test" name="checkout[letter-test]" 
          value={deliveryInstructions?.value}>
        チェックボックステスト2
      </Checkbox>
    </BlockStack>
  );
}