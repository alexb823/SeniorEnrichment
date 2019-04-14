import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col, Image } from 'react-bootstrap';

const Campuses = ({ campuses }) => {
  console.log(campuses);
  if (!campuses.length) {
    return null;
  } else {
    return (
      <Container>
        <Row>
          {campuses.map(campus => (
            <Col key={campus.id} xs={12} md={6} style={{padding: "0"}}>
              <div
                className="main-image m-1"
                style={{ backgroundImage: `url(${campus.imageUrl})` }}
              >
              <div className="fade-in-text align-middle">
                <h1 className="display-4 text-white text-center">{campus.name}</h1>
              </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
};

Campuses.propTypes = {
  campuses: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => {
  return {
    campuses: state.campuses,
  };
};

export default connect(mapStateToProps)(Campuses);
