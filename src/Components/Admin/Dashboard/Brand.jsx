import React from "react";
import { Box, Button, Checkbox, CircularProgress, Divider, Grid, IconButton, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import PaginationTabs from "../../Utils/Pagination";
import AdminGetAllBrandHook from "../../../customHooks/Admin/Brand/AdminGetAllBrandHook";
import AdminDeleteBrandHook from "../../../customHooks/Admin/Brand/AdminDeleteBrandHook";
import WarningModal from "../../Utils/WarningModal";

const Brand = () => {
  const [brands] = AdminGetAllBrandHook();
  const [open, setOpen, itemId, setItemId, isModalOpen, setIsModalOpen, handleConfirmDelete, handleCancelDelete] =
    AdminDeleteBrandHook();

  return (
    <Box sx={{ padding: { xs: 2, sm: 3 }, flex: 1, bgcolor: "#F5F5F5", minHeight: "100vh" }}>
      {/* Title */}
      <Typography variant="h4" sx={{ fontSize: { xs: "1.5rem", sm: "2rem" }, color: "#FF5722" }} gutterBottom>
        Brands
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />

      {/* Add New Brand Button */}
      <Link to={"/dashboard/brand/create"}>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            bgcolor: "#1976D2",
            "&:hover": { bgcolor: "#1259A5" },
            display: "flex",
            justifyContent: "flex-start",
            mb: 3,
            width: { xs: "100%", sm: "auto" },
          }}
        >
          Add New Brand
        </Button>
      </Link>

      {/* Brand List */}
      <Paper sx={{ padding: 2, bgcolor: "white", borderRadius: 2, overflowX: "auto" }}>
        <Grid container spacing={2}>
          {/* Header Row */}
          <Grid container item xs={12} sx={{ bgcolor: "#E0E0E0", py: 1, px: 2, borderRadius: 1 }}>
            <Grid item xs={2}>
              <Typography fontWeight="bold">Select</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography fontWeight="bold">Image</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography fontWeight="bold">Name</Typography>
            </Grid>
            <Grid item xs={3} sx={{ textAlign: "center" }}>
              <Typography fontWeight="bold">Actions</Typography>
            </Grid>
          </Grid>

          {/* Brand Rows */}
          {!brands.data ? (
            <Box sx={{ display: "flex", justifyContent: "center", width: "100%", mt: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            brands.data.map((brand) => (
              <Grid
                container
                item
                xs={12}
                key={brand._id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: { xs: 1, sm: 2 },
                  bgcolor: "#fff",
                  borderBottom: "1px solid #ddd",
                  borderRadius: 1,
                  transition: "all 0.3s ease",
                  "&:hover": { bgcolor: "#f9f9f9" },
                }}
              >
                {/* Checkbox */}
                <Grid item xs={2}>
                  <Checkbox />
                </Grid>

                {/* Image */}
                <Grid item xs={3}>
                  <img
                    src={brand.image}
                    alt={brand.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "10px",
                      objectFit: "cover",
                    }}
                  />
                </Grid>

                {/* Name */}
                <Grid item xs={4}>
                  <Typography sx={{ fontWeight: "500" }}>{brand.name}</Typography>
                </Grid>

                {/* Actions */}
                <Grid item xs={3} sx={{ textAlign: "center" }}>
                  {/* View Button */}
                  <Link to={`/brand/${brand._id}`}>
                    <IconButton sx={{ color: "#1976D2" }}>
                      <Visibility />
                    </IconButton>
                  </Link>

                  {/* Edit Button */}
                  <Link to={`/dashboard/brand/update/${brand._id}`}>
                    <IconButton sx={{ color: "#FF5722" }}>
                      <Edit />
                    </IconButton>
                  </Link>

                  {/* Delete Button */}
                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() => {
                      setItemId(brand._id);
                      setIsModalOpen(true);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
            ))
          )}
        </Grid>
      </Paper>

      {/* Pagination */}
      <PaginationTabs paginationResult={brands.paginationResult} />

      {/* Delete Confirmation Modal */}
      <WarningModal isOpen={isModalOpen}
       onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
         message="Are you sure you want to delete this Brand?" />
    </Box>
  );
};

export default Brand;
