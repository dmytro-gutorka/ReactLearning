import { useState } from "react";
import "./index.css";


export default function App() {
  return (
      <div>
        <TextExpander>
          Space travel is the ultimate adventure! Imagine soaring past the stars
          and exploring new worlds. It's the stuff of dreams and science fiction,
          but believe it or not, space travel is a real thing. Humans and robots
          are constantly venturing out into the cosmos to uncover its secrets and
          push the boundaries of what's possible.
        </TextExpander>

        <TextExpander
            collapsedNumWords={20}
            expandButtonText="Show text"
            collapseButtonText="Collapse text"
            buttonColor="#ff6622"
        >
          Space travel requires some seriously amazing technology and
          collaboration between countries, private companies, and international
          space organizations. And while it's not always easy (or cheap), the
          results are out of this world. Think about the first time humans stepped
          foot on the moon or when rovers were sent to roam around on Mars.
        </TextExpander>

        <TextExpander expanded={true} className="box">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aut ex fugiat harum in laborum
            laudantium non, nulla omnis, quod repellat, reprehenderit. Aperiam dicta distinctio,
            dolore officia porro praesentium tempora.
        </TextExpander>
      </div>
  );
}


function TextExpander({
    collapsedNumWords = 10,
    expandButtonText = "show more",
    collapseButtonText = "show less",
    buttonColor = "blue",
    expanded = false,
    children = "text",
                      }) {
  const buttonStyles = { color: buttonColor };
  const [isExpanded, setIsExpanded] = useState(expanded);

  const shouldBeLimited = children.split(' ').length > collapsedNumWords;
  const limitedText = children.split(' ').toSpliced(0, collapsedNumWords);
  const collapsedText = shouldBeLimited ? limitedText.join(' ') + '...' : children

  return (
      <div className="box">
        <p>{isExpanded ? children : collapsedText}</p>
          {shouldBeLimited &&
              <button style={buttonStyles} onClick={() => setIsExpanded(!isExpanded)}>
                  {isExpanded ? collapseButtonText : expandButtonText}
              </button>
          }
      </div>
  );
}
