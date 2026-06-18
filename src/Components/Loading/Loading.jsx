

import { Container, Spinner } from 'react-bootstrap'

 export const Loading = () => {
  return (
    <Container className='text-center mt-3 d-flex justify-content-center align-items-center'>
<Spinner animation='border' variant="warning"/>
    </Container>
  )
}

