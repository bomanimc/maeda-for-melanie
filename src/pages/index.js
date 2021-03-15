import React from "react";
import styled from 'styled-components';
import Layout from "../components/layout";

/* Decide on the number of characters that should fit on the top (largest)
row based on the maxium font size. */
const numCharactersInRow = 16;

/* This array is a placeholder for the installation submissions, where
each item in the array is a separate submission. There's also some additional
code here (i.e. Array(20).fill(...).flat()) that helps to replicate this
list of example submissions many times so that we can easily see what the 
layout would look like with a ton submissions.
*/
const submissions = Array(20).fill([
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Aenean at ante egestas, cursus augue malesuada, fringilla ipsum.',
  'Aenean pretium odio ac tortor dictum, a maximus lectus vestibulum.',
  'Donec quis mi at magna fermentum maximus.',
  'Quisque ut tellus ut neque interdum porta at non eros.',
  'Curabitur a lacus finibus, auctor velit in, elementum mauris.',
  'Aliquam viverra ipsum ac lacus viverra pulvinar.',
  'Phasellus lacinia enim congue pellentesque facilisis.',
  'Donec dapibus mauris et ullamcorper convallis.',
  'Morbi non erat hendrerit mi scelerisque auctor ut et sem.',
  'Pellentesque quis libero id dolor dapibus dapibus.',
  'Aliquam in arcu porttitor, pretium nisi vitae, euismod orci.',
  'Fusce quis lectus a lectus aliquet maximus.',
  'Nulla a purus eget magna blandit rhoncus quis et nisi.',
  'Praesent varius ipsum sit amet lorem pulvinar, eget tempor nibh dictum.',
  'Nunc dapibus sem et cursus malesuada.',
  'Vestibulum vitae nibh posuere arcu elementum maximus in at nulla.',
  'Nunc dapibus eros quis aliquet pellentesque.',
  'Donec efficitur odio vel ante eleifend, dapibus pellentesque felis blandit.',
  'Curabitur porttitor mauris nec libero suscipit, et pulvinar purus mattis.',
  'Nunc pretium dui eget nulla congue, et fermentum nulla porttitor.',
  'Nam aliquet enim eget cursus ultrices.',
]).flat();

const ContentSection = styled.div`
  flex: 1;

  /* Using CSS Grid (https://css-tricks.com/snippets/css/complete-guide-grid/) 
  to help easily place all of the text rows on top of each other in a column.
  Here, 1fr is telling CSS grid to create a grid with a single column that has
  the ability to fill all of the space that this grid is allowed to take up. */
  display: grid;
  grid-template-columns: 1fr;

  /* Adding this CSS property to center all of the 
  content in the rows to address the possibility that
  the rows don't entire fill the width of the screen. */
  justify-items: center;
`;

const TextRow = styled.p`
  text-transform: uppercase;
  line-height: 0.7;

  /* This is the logic that controls the sizing for each row. Each row will get a font-size
  that is calculated to be 10vw * 1 / (index of the row), so the font size in first row would
  be 10vw * (1/1), the second has size 10vw * (1/2), the third has size 10vw * (1/3), and so on.
  */
  font-size: calc(10vw * ${(p) => 1 / p.rowIndex});
`;


const IndexPage = () => {
  /* This function helps us to take all of our submissions and split up their contents 
  across the rows in our layout in a sensible way. */
  const createTextRows = () => {
    /* First, let's change our array of submissions into one big block of text with .join (' '), then
    split the big block into an array of single characters. */
    const allCharactersInSubmission = submissions.join(' ').split('');

    /* Using a while loop, we can grab bigger and bigger chunks of characters from the list.
    We know that at the size 10vw numCharactersInRow can fit into the first line and that in our CSS, we've 
    set the sizing for each row based on the equation 10vw * 1 / (index of the row). We are also using
    a monospace font, so each letter in the font takes ip the same amount of space. Following this logic,
    we know that the second row, which is set at font size 10vw * (1 / 2) would be able to hold twice as many
    characters as the first row. The third would row would be able to hold 3 times as many characters as the first
    row, and so on. Overall, we'll find that the number of characters in each row increment by 16 (i.e. 16, 36, 48, etc). */
    const textForRows = [];
    let characterIndex = 0;
    let rowCount = 1;

    // Move through and grap increasingly wider slices of the character (16, 35, 48, etc) from allCharactersInSubmission.
    while (characterIndex <= allCharactersInSubmission.length) {
      const indexOfLastCharacterInRow = characterIndex + (numCharactersInRow * rowCount);
      // Here', we grad a subarray of the characters based on indexOfLastCharacterInRow (e.g. ['l', 'o', 'r', ...]).
      // Once we grab the sub-array of characters, join them back into a normal string with .join('').
      const rowText = allCharactersInSubmission.slice(characterIndex, indexOfLastCharacterInRow).join('');
      
      // Add the row text to the textForRows array and update the rowCount and characterIndex.
      textForRows.push(rowText);
      rowCount++;
      characterIndex = indexOfLastCharacterInRow;
    }

    // Create <p> tags for each row of text we created!
    return textForRows.map((rowText, idx) => <TextRow rowIndex={idx + 1}>{rowText}</TextRow>);
  };

  return (
    <Layout>
      <ContentSection>
        {/* Here's lets call our function which returns an array of <p> tags with all of the text sections we calculated.*/}
        {createTextRows()}
      </ContentSection>
    </Layout>
  );
};

export default IndexPage;
