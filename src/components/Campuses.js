import React from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';
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
          <LinkContainer to="/campuses/add">
            <Button variant="outline-dark" className="ml-auto">
              New Campus <FontAwesomeIcon icon={faPlus} className="ml-1" />
            </Button>
          </LinkContainer>
        </Row>

        <Row>
          {campuses.map(campus => (
            <Col key={campus.id} xs={12} md={6} style={{ padding: '0' }}>
              <div
                className="main-image m-1"
                style={{ backgroundImage: `url(${campus.imageUrl})` }}
              >
                <LinkContainer to={`/campuses/${campus.id}`}>
                  <div className="fade-in-text align-middle">
                    <h1 className="display-4 text-white text-center text-truncate">
                      {campus.name}
                    </h1>
                  </div>
                </LinkContainer>
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
