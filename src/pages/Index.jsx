import { useState, useEffect } from "react";
import { Box, Heading, Text, Image, Stack, Container, Spinner, Link } from "@chakra-ui/react";

const API_KEY = "YOUR_NEWS_API_KEY";
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

const Index = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setArticles(data.articles);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <Container maxW="container.lg" py={8}>
      <Heading as="h1" size="2xl" mb={8}>
        Latest News
      </Heading>

      {isLoading ? (
        <Spinner size="xl" />
      ) : (
        <Stack spacing={8}>
          {articles.map((article) => (
            <Box key={article.url} borderWidth={1} p={4} rounded="md">
              {article.urlToImage && <Image src={article.urlToImage} alt={article.title} mb={4} objectFit="cover" w="100%" h={48} />}
              <Heading as="h2" size="xl" mb={2}>
                <Link href={article.url} isExternal>
                  {article.title}
                </Link>
              </Heading>
              <Text fontSize="lg" mb={2}>
                {article.description}
              </Text>
              <Text color="gray.500">
                {article.author} - {new Date(article.publishedAt).toLocaleString()}
              </Text>
            </Box>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default Index;
