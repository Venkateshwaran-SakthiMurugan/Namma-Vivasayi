import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Stack, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

export default function SignupCard() {
  return (
    <Card maxW="sm" margin="30px auto"backgroundBlendMode={"hue"} bgImg={"https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFncmljdWx0dXJlfGVufDB8fDB8fHww"} >
      <CardHeader>
        <Heading size="md">Sign up</Heading>
        <Text color="gray.500">Fill in the form below to create an account</Text>
      </CardHeader>
      <CardBody >
        <Stack spacing={4} w="full">
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input />
          </FormControl>
          <FormControl>
            <FormLabel >Last Name</FormLabel>
            <Input />
          </FormControl>
        </Stack>
      </CardBody>
      <CardFooter justifyContent="flex-end" display="flex" gap={2}>
        <Button variant="outline">Cancel</Button>
        <Button colorScheme="blue">Sign in</Button>
      </CardFooter>
    </Card>
  );
}

