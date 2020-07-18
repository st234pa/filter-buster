import React from 'react';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import EmailPreview from './EmailPreview';
import { addRandomizedCharacters } from '../App';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function FilterKiller() {
  let query = useQuery();
  // ex. <homepage>?to=<to>&bcc=<bcc>
  const templateSubject = query.get('subject');
  const [subject, setSubject] = React.useState<string>(
    templateSubject ? templateSubject : ''
  );
  const [randomizedSubject, setRandomizedSubject] = React.useState<string>('');
  const templateBody = query.get('body');
  const [body, setBody] = React.useState<string>(
    templateBody ? templateBody : ''
  );
  const [randomizedBody, setRandomizedBody] = React.useState<string>('');
  const [doneEditing, setDoneEditing] = React.useState<boolean>(false);

  function onDoneEditing() {
    setDoneEditing(true);
    setRandomizedSubject(addRandomizedCharacters(subject));
    setRandomizedBody(addRandomizedCharacters(body));
    window.open(`mailto:${query.get('to')}`);
  }
  function onBackToEdit() {
    setDoneEditing(false);
  }

  return (
    <Container className="p-3">
      <Row className="justify-content-md-center">
        <Col lg={8}>
          <h1 className="text-center mb-3">Filter Killer</h1>
        </Col>
      </Row>
      <Row className="justify-content-md-center mb-0">
        <Col lg={8}>
          <p className="text-center mb-0">
            Inspired by{' '}
            <a
              href="https://linktr.ee/justiceforelijahmcclain"
              target="_blank"
              rel="noopener noreferrer"
            >
              @Justiceforelijahmcclain
            </a>
            , we've created a new tool to help make sure that your email isn't
            ignored by your intended recipients. After you finish editing the
            content of your email, Filter Killer inserts a randomized character
            into each word to bypass any filters.
          </p>
          <p className="text-center mb-3">
            <small>&mdash; Sarah and Stephanie Yoon</small>
          </p>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col lg={8}>
          <Card>
            <Card.Body>
              <EmailPreview
                to={query.get('to')}
                cc={query.get('cc')}
                bcc={query.get('bcc')}
                subject={subject}
                randomizedSubject={randomizedSubject}
                randomizedBody={randomizedBody}
                body={body}
                setSubject={setSubject}
                setBody={setBody}
                doneEditing={doneEditing}
                onDoneEditing={onDoneEditing}
                backToEdit={onBackToEdit}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default FilterKiller;
