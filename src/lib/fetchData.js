import React, { PropTypes, Component } from 'react';

export default function fetchData(prepareFn) {
  return DecoratedComponent => {
    class PrepareRouteDecorator extends Component {
      constructor(props) {
        super(props);
      }

      componentDidMount() {
        const {
          context: { store },
          props: { params, location },
        } = this;

        prepareFn(store, params, location);
      }

      render() {
        return (
          <DecoratedComponent {...this.props} />
        );
      }
    }

    PrepareRouteDecorator.fetchData = prepareFn;
    PrepareRouteDecorator.contextTypes = {
      store: PropTypes.object.isRequired,
    };

    return PrepareRouteDecorator;
  };
}
