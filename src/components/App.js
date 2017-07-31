import React from 'react';

import FruitBasket from './FruitBasket';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      fruit: [],
      filters: [],
      currentFilter: null
    };

    this.fetchFilters = this.fetchFilters.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentWillMount() {
    fetch('/api/fruit')
      .then(response => response.json())
      .then(fruit => this.setState({ fruit }));

    this.fetchFilters();
  }

  fetchFilters = () => {
    fetch('/api/fruit_types')
      .then(response => response.json())
      .then(filters => this.setState({ filters }));
  }

  handleFilterChange = event => {
    console.log('new filter: ', event.target.value);
    this.setState({ currentFilter: event.target.value });
  }

  render() {
    return (
      <FruitBasket
        updateFilterCallback={this.handleFilterChange}
        currentFilter={this.state.currentFilter}
        filters={this.state.filters}
        fruit={this.state.fruit}
      />
    );
  }
}

export default App;
