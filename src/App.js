import React, { Component } from 'react';
import Table from './Table';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

class App extends Component {
  render() {
    return (
      <table>
        <TableHeader />
        <TableBody />
      </table>
    )
  }
}

export default App;
