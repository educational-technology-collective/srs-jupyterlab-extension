import { ReactWidget } from '@jupyterlab/apputils';

import React, { useState } from 'react';

/**
 * React component for a counter.
 *
 * @returns The React component
 */
// const CounterComponent = (): JSX.Element => {
//   const [counter, setCounter] = useState(0);
//
//   return (
//     <div>
//       <p>You clicked {counter} times!</p>
//       <button
//         onClick={(): void => {
//           setCounter(counter + 1);
//         }}
//       >
//         Increment
//       </button>
//     </div>
//   );
// };

/**
 * A Counter Lumino Widget that wraps a CounterComponent.
 */
export class CounterWidget extends ReactWidget {
  /**
   * Constructs a new CounterWidget.
   */
  _flashcard: JSON[];

  constructor(flashcard: JSON[]) {
    super();
    this._flashcard = flashcard;
    this.addClass('jp-ReactWidget');
  }

  render(): JSX.Element {
    return (
      <div style={{ width: '100%', padding: '20px' }}>
        {this._flashcard.map((flashcard, index) =>
          <div key={index} style={{ backgroundColor: '#f5f5f5', borderRadius: '5px', padding: '20px', marginBottom: '20px' }}>
            {Object.entries(flashcard).map(([key, value]) =>
              <div key={key} style={{ fontSize: key === 'question' ? '20px' : '16px', fontWeight: key === 'question' ? 'bold' : 'normal' }}>
                {key}: {value}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
