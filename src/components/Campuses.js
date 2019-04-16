import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Campuses = ({ campuses }) => {
  if (!campuses.length) {
    return null;
  } else {
    return (
      <Container>
        <Row className="mb-3">
          <Button variant="outline-dark" className="ml-auto" href="#/campuses/add">
            New Campus <FontAwesomeIcon icon={faPlus}  className="ml-1"/>
          </Button>
        </Row>

        <Row>
          {campuses.map(campus => (
            <Col key={campus.id} xs={12} md={6} style={{ padding: '0' }}>
              <div
                className="main-image m-1"
                style={{ backgroundImage: `url(${campus.imageUrl})` }}
              >
                <Link to={`/campuses/${campus.id}`}>
                  <div className="fade-in-text align-middle">
                    <h1 className="display-4 text-white text-center">
                      {campus.name}
                    </h1>
                  </div>
                </Link>
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
