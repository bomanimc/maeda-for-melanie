import React from "react";
import styled from 'styled-components';
import { Link } from 'gatsby';

import Layout from "../components/layout";
import SEO from "../components/seo";

const sentences = [
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
];

const IndexPage = () => {
  const createTextRows = () => {
    const allCharactersInSubmission = sentences.join(' ').split('');

    const textForRows = [];
    let characterIndex = 0;
    let rowCount = 1;
    let rowScalingFactor = 16;
    while (characterIndex <= allCharactersInSubmission.length) {
      const indexOfLastCharacterInRow = characterIndex + (16 * rowCount);
      const rowText = allCharactersInSubmission.slice(characterIndex, indexOfLastCharacterInRow).join('');
      
      textForRows.push(rowText);
      rowCount++;
      characterIndex = indexOfLastCharacterInRow;
    }

    console.log(textForRows);

    return textForRows.map((rowText, idx) => <IndexPage.TextRow rowIndex={idx + 1}>{rowText}</IndexPage.TextRow>);
  };

  return (
    <Layout>
      <SEO title="Home" />
      <IndexPage.Content>
        {createTextRows()}
      </IndexPage.Content>
    </Layout>
  );
};

IndexPage.Content = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr;
`;

IndexPage.TextRow = styled.p`
  text-transform: uppercase;
  line-height: 0.7;
  font-size: calc(10vw * ${(p) => 1 / p.rowIndex});
`;


export default IndexPage;
