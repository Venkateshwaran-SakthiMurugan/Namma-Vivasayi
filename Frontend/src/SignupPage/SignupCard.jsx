import { 
  Box, HStack, IconButton, Text, Spacer, Menu, MenuButton, MenuList, MenuItem, Button, VStack, Heading, Image, SimpleGrid, Input, Link, Fade, ScaleFade 
} from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaPhone, FaEnvelope, FaGlobe, FaCheckCircle, FaArrowDown, FaListAlt, FaTruck } from "react-icons/fa";
import { useRef } from "react";

// Header Component
function Header() {
  return (
    <Box bg="white" px={6} py={3} shadow="md" w="100%" position="fixed" top="0" zIndex="10">
      <HStack spacing={4}>
        {/* Social Media Icons */}
        <IconButton icon={<FaTwitter />} aria-label="Twitter" variant="ghost" />
        <IconButton icon={<FaFacebook />} aria-label="Facebook" variant="ghost" />
        <IconButton icon={<FaInstagram />} aria-label="Instagram" variant="ghost" />
        <IconButton icon={<FaWhatsapp />} aria-label="WhatsApp" variant="ghost" />
        <IconButton icon={<FaPhone />} aria-label="Phone" variant="ghost" />
        <IconButton icon={<FaEnvelope />} aria-label="Email" variant="ghost" />

        <Spacer />

        {/* Title */}
        <center>
        <Text fontSize="lg" fontWeight="bold" letterSpacing="wider" fontFamily="Roboto,sans-serif">
          NAMMA VIVASAYI – CONNECTING FIELD TO FAMILIES
        </Text>
        </center>

        <Spacer />

        {/* Language Dropdown */}
        <Menu>
          <MenuButton as={Button} leftIcon={<FaGlobe />} fontFamily="Roboto,sans-serif">
            Language
          </MenuButton>
          <MenuList>
            <MenuItem fontFamily="Roboto,sans-serif">English</MenuItem>
            <MenuItem>தமிழ்</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Box>
  );
}

// Card Component
function InfoCard({ image, title, description }) {
  return (
    <Box p={6} bg="white" borderRadius="md" boxShadow="lg" textAlign="center">
      <Image src={image} alt={title} borderRadius="md" mb={4} />
      <Heading size="md" fontFamily="Roboto,sans-serif">{title}</Heading>
      {description && <Text mt={2}>{description}</Text>}
    </Box>
  );
}

// Home Page Component
export default function HomePage() {
  const newPageRef = useRef(null); // Ref for the new page
  const secondPageRef = useRef(null);
  const thirdPageRef = useRef(null);
  const fourthPageRef = useRef(null);

  const scrollToNextPage = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Header />

      <VStack spacing={0}>
        {/* First Page */}
        <Box
          w="100%"
          h="100vh"
          position="relative"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          {/* Background Image with Opacity */}
          <Box 
            position="absolute" 
            top="0" 
            left="0" 
            w="100%" 
            h="100%" 
            bgImage="url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop')" 
            bgSize="cover" 
            bgPosition="center" 
            filter="brightness(50%)" 
          />

          {/* Content */}
          <VStack position="relative" spacing={6} textAlign="center">
            <Image 
              src="https://media.istockphoto.com/id/1088987148/photo/organic-leaf-symbol-for-logo.jpg?s=2048x2048&w=is&k=20&c=6msdH7ncIsIB1zR82CMF6ErFc4q-MIHxVlZbWZGT8HI=" 
              alt="Namma Vivasayi Logo" 
              boxSize="200px" // Increased logo size
              borderRadius="100%" 
            />
            <Heading size="2xl" color="white" fontFamily="Roboto,sans-serif">NAMMA VIVASAYI</Heading> {/* Increased text size */}
          </VStack>

          {/* Scroll Down Button */}
          <Fade in={true}>
            <Button 
              onClick={() => scrollToNextPage(newPageRef)} 
              colorScheme="teal" 
              position="absolute" 
              bottom="10%"
              left="50%" // Center horizontally
              transform="translateX(-50%)" // Adjust for exact center
              size="lg" // Increased button size
              fontFamily="Roboto,sans-serif"
              rightIcon={<FaArrowDown />} // Add down arrow
              _hover={{ bg: "teal.600", transform: "translateX(-50%) scale(1.05)" }} // Hover effect
              transition="all 0.2s" // Smooth transition
            >
              About
            </Button>
          </Fade>
        </Box>

        {/* New Page */}
        // New Page
<Box
  ref={newPageRef}
  w="100%"
  h="100vh"
  position="relative"
  display="flex"
  alignItems="center"
  justifyContent="center"
  flexDirection="column"
>
  {/* Background Image with Opacity */}
  <Box 
    position="absolute" 
    top="0" 
    left="0" 
    w="100%" 
    h="100%" 
    bgImage="https://images.unsplash.com/photo-1464297162577-f5295c892194?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    bgSize="cover" 
    bgPosition="center" 
    filter="brightness(50%)" 
  />

  {/* Content */}
  <VStack position="relative" spacing={4} textAlign="center" color="white">
    <Heading size="xl" fontFamily="Roboto,sans-serif">Who We Are</Heading>
    <Text fontSize="lg" maxW="800px" fontFamily="Roboto,sans-serif" lineHeight="tall">
      Namma Vivasayi is more than a marketplace — it’s a movement towards a fairer, tech-driven agricultural future! We are a passionate community of farmers, consumers, and innovators united by a shared vision: to bridge the gap between the fields and families, ensuring fresh, sustainable produce reaches your table while empowering farmers with the tools and opportunities they deserve.
    </Text>
    <Text fontSize="lg" maxW="800px" fontFamily="Roboto,sans-serif" lineHeight="tall">
      At Namma Vivasayi, we believe in the power of technology to transform traditional farming practices. By leveraging cutting-edge solutions, we connect farmers directly with consumers, eliminating middlemen and ensuring fair prices for both. Our platform is designed to create a transparent, traceable, and efficient agricultural supply chain that benefits everyone involved.
    </Text>
  </VStack>

  {/* Scroll Down Button */}
  <Fade in={true}>
    <Button 
      onClick={() => scrollToNextPage(secondPageRef)} 
      colorScheme="teal" 
      position="absolute" 
      bottom="10%"
      left="50%" // Center horizontally
      transform="translateX(-50%)" // Adjust for exact center
      size="lg"
      fontFamily="Roboto,sans-serif"
      rightIcon={<FaArrowDown />} // Add down arrow
      _hover={{ bg: "teal.600", transform: "translateX(-50%) scale(1.05)" }} // Hover effect
      transition="all 0.2s" // Smooth transition
    >
      Learn More
    </Button>
  </Fade>
</Box>

        {/* Second Page with Cards */}
        // Second Page with Cards
<Box
  ref={secondPageRef}
  w="100%"
  h="100vh"
  position="relative"
  display="flex"
  alignItems="center"
  justifyContent="center"
  flexDirection="column"
>
  {/* Background Image with Opacity */}
  <Box 
    position="absolute" 
    top="0" 
    left="0" 
    w="100%" 
    h="100%" 
    bgImage="https://images.unsplash.com/photo-1467740100611-36858db27485?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    bgSize="cover" 
    bgPosition="center" 
    filter="brightness(50%)" 
  />

  {/* Title */}
  <Heading 
    size="xl" 
    fontFamily="Roboto,sans-serif" 
    color="white" 
    mb={8} // Add margin-bottom for spacing
    position="relative" // Ensure it's positioned correctly
  >
    Key Features
  </Heading>

  {/* Cards */}
  <SimpleGrid columns={4} spacing={4} w="80%" position="relative">
    <InfoCard 
      image="https://images.unsplash.com/photo-1572402123736-c79526db405a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
      title="Farm-Fresh Quality" 
      description="Fruits and vegetables are harvested at peak ripeness and delivered without long storage times." 
    />
    <InfoCard 
      image="https://images.unsplash.com/photo-1695653422259-8a74ffe90401?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
      title="Direct Sourcing"
      description="We work directly with farmers, eliminating middlemen and ensuring fair prices for both farmers and consumers." 
    />
    <InfoCard 
      image="https://images.unsplash.com/photo-1485637701894-09ad422f6de6?q=80&w=2036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
      title="Sustainable Practices" 
      description="Supporting eco-friendly farming methods that preserve soil health and reduce waste."
    />
    <InfoCard 
      image="https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
      title="Quick & Hassle-Free Delivery" 
      description="Get the freshest produce delivered conveniently to your home."
    />
  </SimpleGrid>

  {/* Scroll Down Button */}
  <Fade in={true}>
    <Button 
      onClick={() => scrollToNextPage(thirdPageRef)} 
      colorScheme="teal" 
      position="absolute" 
      bottom="10%"
      left="50%" // Center horizontally
      transform="translateX(-50%)" // Adjust for exact center
      size="lg"
      fontFamily="Roboto,sans-serif"
      rightIcon={<FaArrowDown />} // Add down arrow
      _hover={{ bg: "teal.600", transform: "translateX(-50%) scale(1.05)" }} // Hover effect
      transition="all 0.2s" // Smooth transition
    >
      Scroll Down
    </Button>
  </Fade>
</Box>

        {/* Third Page */}
        // Third Page
<Box
  ref={thirdPageRef}
  w="100%"
  minH="100vh" // Use minH instead of h to allow the page to grow if content exceeds viewport height
  position="relative"
  display="flex"
  alignItems="center"
  justifyContent="center"
  flexDirection="column"
  pb={20} // Add padding at the bottom to avoid overlapping
>
  {/* Background Image with Opacity */}
  <Box 
    position="absolute" 
    top="0" 
    left="0" 
    w="100%" 
    h="100%" 
    bgImage="https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    bgSize="cover" 
    bgPosition="center" 
    filter="brightness(50%)" 
  />

  {/* Content */}
  <VStack position="relative" spacing={8} textAlign="center" color="white" maxW="800px" px={4}>
    <Heading size="xl" fontFamily="Roboto,sans-serif">Why Choose Us?</Heading>
    <Text fontSize="lg" maxW="600px" fontFamily="Roboto,sans-serif">
      We unite buyers and sellers on a transparent and traceable platform, using advanced technology to optimize agricultural supply chains.
    </Text>

    {/* Features Section */}
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} w="80%">
      {/* Transparency */}
      <ScaleFade in={true} initialScale={0.9}>
        <Box 
          p={6} 
          bg="white" 
          borderRadius="md" 
          boxShadow="lg" 
          textAlign="center" 
          color="black"
          _hover={{ transform: "scale(1.05)", transition: "transform 0.2s" }}
        >
          <VStack spacing={4}>
            <FaGlobe size={40} color="teal" /> {/* Icon for Transparency */}
            <Heading size="md" fontFamily="Roboto,sans-serif">Transparency</Heading>
            <Text fontSize="sm">We believe in open and honest relationships with our customers.</Text>
          </VStack>
        </Box>
      </ScaleFade>

      {/* Quality Assurance */}
      <ScaleFade in={true} initialScale={0.9}>
        <Box 
          p={6} 
          bg="white" 
          borderRadius="md" 
          boxShadow="lg" 
          textAlign="center" 
          color="black"
          _hover={{ transform: "scale(1.05)", transition: "transform 0.2s" }}
        >
          <VStack spacing={4}>
            <FaCheckCircle size={40} color="teal" /> {/* Icon for Quality Assurance */}
            <Heading size="md" fontFamily="Roboto,sans-serif">Quality Assurance</Heading>
            <Text fontSize="sm">We have stringent quality control measures in place.</Text>
          </VStack>
        </Box>
      </ScaleFade>

      {/* Variety */}
      <ScaleFade in={true} initialScale={0.9}>
        <Box 
          p={6} 
          bg="white" 
          borderRadius="md" 
          boxShadow="lg" 
          textAlign="center" 
          color="black"
          _hover={{ transform: "scale(1.05)", transition: "transform 0.2s" }}
        >
          <VStack spacing={4}>
            <FaListAlt size={40} color="teal" /> {/* Icon for Variety */}
            <Heading size="md" fontFamily="Roboto,sans-serif">Variety</Heading>
            <Text fontSize="sm">Our extensive selection ensures you’ll find everything you need.</Text>
          </VStack>
        </Box>
      </ScaleFade>

      {/* Convenience */}
      <ScaleFade in={true} initialScale={0.9}>
        <Box 
          p={6} 
          bg="white" 
          borderRadius="md" 
          boxShadow="lg" 
          textAlign="center" 
          color="black"
          _hover={{ transform: "scale(1.05)", transition: "transform 0.2s" }}
        >
          <VStack spacing={4}>
            <FaTruck size={40} color="teal" /> {/* Icon for Convenience */}
            <Heading size="md" fontFamily="Roboto,sans-serif">Convenience</Heading>
            <Text fontSize="sm">Say goodbye to crowded markets and long queues.</Text>
          </VStack>
        </Box>
      </ScaleFade>
    </SimpleGrid>
  </VStack>

  {/* Scroll Down Button */}
  <Fade in={true}>
    <Button 
      onClick={() => scrollToNextPage(fourthPageRef)} 
      colorScheme="teal" 
      position="absolute" 
      bottom="5%"
      left="50%" // Center horizontally
      transform="translateX(-50%)" // Adjust for exact center
      size="lg"
      fontFamily="Roboto,sans-serif"
      rightIcon={<FaArrowDown />} // Add down arrow
      _hover={{ bg: "teal.600", transform: "translateX(-50%) scale(1.05)" }} // Hover effect
      transition="all 0.2s" // Smooth transition
    >
      Scroll Down
    </Button>
  </Fade>
</Box>

// Fourth Page
// Fourth Page
<Box
  ref={fourthPageRef}
  w="100%"
  minH="100vh" // Use minH instead of h to allow the page to grow if content exceeds viewport height
  position="relative"
  display="flex"
  alignItems="center"
  justifyContent="flex-start" // Changed to flex-start to lower content
  flexDirection="column"
  pt={20} // Add padding at the top to push content down
  pb={20} // Add padding at the bottom to create space
>
  {/* Background Image with Opacity */}
  <Box 
    position="absolute" 
    top="0" 
    left="0" 
    w="100%" 
    h="100%" 
    bgImage="https://images.unsplash.com/uploads/141247613151541c06062/c15fb37d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    bgSize="cover" 
    bgPosition="center" 
    filter="brightness(50%)" 
  />

  {/* Content */}
  <VStack position="relative" spacing={6} textAlign="center" color="white" mt={-10}> {/* Added margin-top to lower content further */}
    <Heading size="xl" fontFamily="Roboto,sans-serif">Join Us</Heading>
    <Text fontSize="lg" maxW="600px" fontFamily="Roboto,sans-serif">
      Become a part of our journey to transform agriculture and nourish communities. Together, we can make a difference.
    </Text>

    {/* Login Panels */}
    <SimpleGrid columns={2} spacing={10} w="90%"> {/* Increased width to 90% */}
      {/* Farmer Login Panel */}
      <Box p={8} bg="white" borderRadius="md" boxShadow="lg" textAlign="center" color="black" w="100%"> {/* Increased padding and width */}
        <VStack spacing={4}>
          {/* Farmer Avatar */}
          <Image 
            src="https://cdn-icons-png.flaticon.com/128/12088/12088085.png" // Farmer avatar image
            alt="Farmer Avatar"
            boxSize="100px" // Adjust size as needed
            mb={4} // Add margin below the avatar
          />
          <Heading size="md" fontFamily="Roboto,sans-serif" mb={6}>ARE YOU HERE TO SELL?</Heading> {/* Increased margin-bottom */}
          <VStack spacing={6}> {/* Increased spacing */}
            <Input placeholder="Enter Username" size="lg" /> {/* Increased input size */}
            <Input placeholder="Enter Password" type="password" size="lg" /> {/* Increased input size */}
            <Button colorScheme="teal" w="100%" size="lg">LOGIN AS FARMER</Button> {/* Increased button size */}
            <Text fontSize="sm">DON'T HAVE AN ACCOUNT? <Link color="teal.500">REGISTER</Link></Text>
          </VStack>
        </VStack>
      </Box>

      {/* Consumer Login Panel */}
      <Box p={8} bg="white" borderRadius="md" boxShadow="lg" textAlign="center" color="black" w="100%"> {/* Increased padding and width */}
        <VStack spacing={4}>
          {/* Customer Avatar */}
          <Image 
            src="https://cdn-icons-png.flaticon.com/128/3225/3225069.png" // Customer avatar image
            alt="Customer Avatar"
            boxSize="100px" // Adjust size as needed
            mb={4} // Add margin below the avatar
          />
          <Heading size="md" fontFamily="Roboto,sans-serif" mb={6}>ARE YOU HERE TO BUY?</Heading> {/* Increased margin-bottom */}
          <VStack spacing={6}> {/* Increased spacing */}
            <Input placeholder="Enter Username" size="lg" /> {/* Increased input size */}
            <Input placeholder="Enter Password" type="password" size="lg" /> {/* Increased input size */}
            <Button colorScheme="teal" w="100%" size="lg">LOGIN AS CONSUMER</Button> {/* Increased button size */}
            <Text fontSize="sm">DON'T HAVE AN ACCOUNT? <Link color="teal.500">REGISTER</Link></Text>
          </VStack>
        </VStack>
      </Box>
    </SimpleGrid>

    {/* Conditions of Use and Other Links */}
    <Box display="flex" justifyContent="center" gap={6} fontSize="sm" mt="10">
          <Link href="#" color="white">Conditions of Use</Link>
          <Link href="#" color="white">Privacy Notice</Link>
          <Link href="#" color="white">Help</Link>
          <Link href="#" color="white">Cookies Notice</Link>
          <Link href="#" color="white">Interest-Based Ads Notice</Link>
        </Box>
  </VStack>
</Box>
     </VStack>
      
    </>
  );}