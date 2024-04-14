import {
  Grid,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
  Stack,
  Pagination,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import useProductList from '../hooks/useProductList';
import { formatToUSD } from '../utils/currency';
import { Product } from '../interfaces/products';
import { ProductCard } from './styles';

export function ProductList() {
  const { breakpoints } = useTheme();
  const {
    productsList,
    loading,
    error,
    snackbarOpen,
    handleBuyClick,
    handleSnackbarClose,
    MutationLoading,
    currentPage,
    totalPages,
    handleChangePage,
  } = useProductList();
  const isMobile = useMediaQuery(breakpoints.up('xs'));

  if (loading) {
    return (
      <Grid
        data-testid="loading-spinner"
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: '100vh' }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: '100vh' }}
      >
        <Alert severity="error">
          An error occurred while fetching products: {error.message}
        </Alert>
      </Grid>
    );
  }

  return (
    <Stack alignItems="center">
      <Typography py={[3, 2]} variant={isMobile ? 'h2' : 'h1'}>
        Product List
      </Typography>
      <Grid container spacing={4} sx={{ padding: 4 }}>
        {productsList?.map((product: Product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} sx={{}}>
            <ProductCard
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                  transform: 'scale3d(1.05, 1.05, 1)',
                  transition: 'transform 0.3s',
                },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={product.featuredAsset.source}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Stack pt={2}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Price variants:</strong>
                  </Typography>
                  <Grid container spacing={1} sx={{ marginTop: 1 }}>
                    {product.variants.map((variant, index: number) => (
                      <Grid item key={index} xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          {formatToUSD(variant.price)}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Stack>
              </CardContent>
              <CardActions
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}
              >
                <Button
                  variant="contained"
                  data-testid="buy-button-1"
                  onClick={() => handleBuyClick(product.id)}
                  size="small"
                  disabled={MutationLoading}
                >
                  Buy
                </Button>
              </CardActions>
            </ProductCard>
          </Grid>
        ))}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={'An error occurred while adding the item to the order'}
        />
        <Stack py={4} justifyContent="center" alignItems="center" width="100%">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
          />
        </Stack>
      </Grid>
    </Stack>
  );
}
