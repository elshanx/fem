import {
  Button,
  Container,
  Heading,
  Input,
  Label,
  Side,
} from './Login.styles';

const Login = () => {
  return (
    <Container>
      <Side left>
        <Heading>Company Name</Heading>
      </Side>
      <Side right>
        <form>
          <Label>
            email
            <div>
              <Input type='email' name='email' placeholder='email' />
            </div>
          </Label>
          <Label>
            password
            <div>
              <Input
                type='password'
                name='password'
                placeholder='password'
              />
            </div>
          </Label>
          <Button second>Submit</Button>
        </form>
      </Side>
    </Container>
  );
};

export default Login;
