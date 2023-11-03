import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { WorkBookData } from "./data";
import Sections from "./Sections";
import { chunkArray } from "./DargAndDropUtil";

import App from "./App";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle, index) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: "10px",

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",
  maxWidth: index === 0 ? window.innerWidth : window.innerWidth / 2,
  flex: 1,
  // styles we need to apply on draggables
  ...draggableStyle,
  width: "94%",
  overflow: "hidden"
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  display: "flex",
  flex: 1
});

const getIndex = (list, value) => {
  const sectionID = value.split("-");
  return list.findIndex((x) => x.id === sectionID[0]);
};

class App1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: WorkBookData
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  getSections = (sectionId) => {
    let l = [];
    for (let i = 0; i < this.state.items.length; i++) {
      for (let j = 0; j < this.state.items[i].sections.length; j++) {
        if (this.state.items[i].sections[j].id === sectionId) {
          l = l.concat(this.state.items[i]);
        }
      }
    }
    return l[0];
  };

  getCardIndex = (cards, rowId, index, updatedSourceIndex) => {
    const maxWidth = document.getElementById("SectionsContainer").clientWidth;
    const cardsData = chunkArray(cards, maxWidth);
    let previousRowsElementsCount = 0;
    for (let i = 0; i < rowId; i++) {
      previousRowsElementsCount += cardsData[i].length;
    }

    const isSourceGreaterThanDest =
      updatedSourceIndex !== undefined
        ? updatedSourceIndex > previousRowsElementsCount + index
        : true;

    let updatedIndex;

    if (isSourceGreaterThanDest === true) {
      updatedIndex = previousRowsElementsCount + index;
    } else {
      if (previousRowsElementsCount === 0) {
        updatedIndex = previousRowsElementsCount + index;
      } else {
        updatedIndex = previousRowsElementsCount + index - 1;
      }
    }

    return updatedIndex;
  };

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    if (result.type === "droppableListItem") {
      const lists = reorder(this.state.items, sourceIndex, destIndex);
      this.setState({
        items: lists
      });
      return;
    }
    if (result.type === "droppableItem") {
      const sourceParentIndex = getIndex(
        this.state.items,
        result.source.droppableId
      );
      const destParentIndex = getIndex(
        this.state.items,
        result.destination.droppableId
      );
      const newItems = [...this.state.items];
      if (sourceParentIndex === destParentIndex) {
        newItems[sourceParentIndex].sections = reorder(
          newItems[sourceParentIndex].sections,
          sourceIndex,
          destIndex
        );
      } else {
        const [draggedItem] = newItems[sourceParentIndex].sections.splice(
          sourceIndex,
          1
        );
        newItems[destParentIndex].sections.splice(destIndex, 0, draggedItem);
      }
      this.setState({
        items: newItems
      });
      return;
    } else if (result.type === "droppableSubItem") {
      const sourceSectionID = result.source.droppableId.split("-")[0];
      const sourceSectionRowId = parseInt(
        result.source.droppableId.split("-")[1]
      );
      const destSectionID = result.destination.droppableId.split("-")[0];
      const destSectionRowId = parseInt(
        result.destination.droppableId.split("-")[1]
      );
      const sourceList = this.getSections(sourceSectionID);
      const destList = this.getSections(destSectionID);
      const sourceParentIndex = getIndex(sourceList.sections, sourceSectionID);
      const destParentIndex = getIndex(destList.sections, destSectionID);
      const newCardItems = [...this.state.items];
      const sourceListIndex = getIndex(newCardItems, sourceList.id);
      const destListIndex = getIndex(newCardItems, destList.id);
      if (sourceSectionID === destSectionID) {
        if (sourceSectionRowId === destSectionRowId) {
          const cards =
            newCardItems[sourceListIndex].sections[sourceParentIndex].cards;

          const updatedSourceIndex = this.getCardIndex(
            cards,
            sourceSectionRowId,
            sourceIndex,
            undefined
          );
          const updatedDestIndex = this.getCardIndex(
            cards,
            destSectionRowId,
            destIndex,
            updatedSourceIndex
          );

          newCardItems[sourceListIndex].sections[
            sourceParentIndex
          ].cards = reorder(cards, updatedSourceIndex, updatedDestIndex);
        } else {
          const cards =
            newCardItems[sourceListIndex].sections[sourceParentIndex].cards;

          const updatedSourceIndex = this.getCardIndex(
            cards,
            sourceSectionRowId,
            sourceIndex,
            undefined
          );
          const updatedDestIndex = this.getCardIndex(
            cards,
            destSectionRowId,
            destIndex,
            updatedSourceIndex
          );

          newCardItems[sourceListIndex].sections[
            sourceParentIndex
          ].cards = reorder(cards, updatedSourceIndex, updatedDestIndex);
        }
      } else {
        const cards =
          newCardItems[sourceListIndex].sections[sourceParentIndex].cards;

        const destinationCards =
          newCardItems[destListIndex].sections[destParentIndex].cards;

        const updatedSourceIndex = this.getCardIndex(
          cards,
          sourceSectionRowId,
          sourceIndex,
          undefined
        );
        const updatedDestIndex = this.getCardIndex(
          destinationCards,
          destSectionRowId,
          destIndex,
          undefined
        );

        const [draggedItem] = newCardItems[sourceListIndex].sections[
          sourceParentIndex
        ].cards.splice(updatedSourceIndex, 1);
        newCardItems[destListIndex].sections[destParentIndex].cards.splice(
          updatedDestIndex,
          0,
          draggedItem
        );
      }

      this.setState({
        items: newCardItems
      });
      return;
    }
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable
          droppableId="droppableList"
          type="droppableListItem"
          direction="horizontal"
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div style={{ padding: "2px", width: "50%" }}>
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                          index
                        )}
                        {...provided.dragHandleProps}
                      >
                        {item.content}
                        <Sections items={item.sections} id={item.id} />
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
// ReactDOM.render(
//   <section>
//     <App />
//   </section>,
//   document.getElementById("root")
// );
