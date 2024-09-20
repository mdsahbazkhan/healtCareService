import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const columns = [
   
  { id: "name", label: "Name", minWidth: 170, backgroundColor: "black" },
  {
    id: "discription",
    label: "Description",
    minWidth: 100,
    align: "center",
    backgroundColor: "black",
  },
  {
    id: "price",
    label: "Price",
    minWidth: 170,
    align: "right",
    backgroundColor: "black",
  },
];

function createData(name, discription, price) {
  return { name, discription, price };
}

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([createData("Health Checkup", "Comprehensive health checkup", 100.0),
    createData("Dental Cleaning", "Teeth cleaning and polishing", 75.0),
    createData("Vaccination", "Routine vaccination for children", 50.0),
    createData("Blood Test", "Complete blood count test", 30.0),
    createData("MRI Scan", "Magnetic resonance imaging scan", 300.0)
  ]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [newData, setNewData] = useState({
    name: "",
    discription: "",
    price: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
    setIsEditing(false);
    setNewData({ name: "", discription: "", price: "" });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });
  };

  const handleAddService = (e) => {
    e.preventDefault();
    const { name, discription, price } = newData;
    if (name && discription && price) {
      const newRow = createData(name, discription, parseFloat(price));
      setRows((prevRows) => [...prevRows, newRow]);
      handleClose();
    } else {
      alert("Please fill in all fields");
    }
  };
  // Update existing service
  const handleUpdateService = (e) => {
    e.preventDefault();
    const { name, discription, price } = newData;
    if (name && discription && price && selectedRow) {
      const updatedRow = createData(name, discription, parseFloat(price));
      setRows((prevRows) =>
        prevRows.map((row) => (row === selectedRow ? updatedRow : row))
      );
      handleClose();
    } else {
      alert("Please fill in all fields");
    }
  };
  // Delete a service
  const handleDeleteService = (rowToDelete) => {
    setRows((prevRows) => prevRows.filter((row) => row !== rowToDelete));
  };
// Edit a service
  const handleEditService = (row) => {
    setSelectedRow(row);
    setNewData({
      name: row.name,
      discription: row.discription,
      price: row.price,
    });
    setOpen(true);
    setIsEditing(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: 3 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "white",
                      fontWeight: "bold",
                      minWidth: column.minWidth,
                      backgroundColor: column.backgroundColor,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell align="center" sx={{ backgroundColor: "black" }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row,index) => (
                  <TableRow hover key={row.name}>
                    
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "price"
                            ? `${value.toFixed(2)}`
                            : value}
                        </TableCell>
                      );
                      
                    })}
                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleEditService(row)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteService(row)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Box sx={{ display: "grid", placeItems: "center", marginTop: "20px" }}>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{ bgcolor: "#1976d2", color: "white" }}
        >
          Add HealthService
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {isEditing ? "Update HealthService" : "Add HealthService"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To {isEditing ? "update" : "add"} a health service, please enter the
            name, description, and price of the service.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            type="text"
            label="Service Name"
            fullWidth
            variant="outlined"
            value={newData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="discription"
            type="text"
            label="Description"
            fullWidth
            variant="outlined"
            value={newData.discription}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
            value={newData.price}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={isEditing ? handleUpdateService : handleAddService}
            color="primary"
          >
            {isEditing ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
