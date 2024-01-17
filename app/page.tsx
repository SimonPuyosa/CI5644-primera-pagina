"use client";
import React, { ChangeEvent, useState } from "react";
import {
  TextField,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type MyDict = { [key: string]: number };

const FruitsRows: MyDict = { Apple: 1, Dragonfruit: 1, Passionfruit: 2 };
const VegetablesRows: MyDict = { Spinach: 2, Pumkin: 4, Peas: 1 };

const filterRows = (rows: MyDict, substring: string): MyDict => {
  let newRows: MyDict = {};
  for (let key in rows) {
    if (key.includes(substring)) {
      newRows[key] = rows[key];
    }
  }
  return newRows;
};

export default function Home() {
  const [FruitsFilterRows, setFruitsFilterRows] = useState(FruitsRows);
  const [VegetablesFilterRows, setVegetablesFilterRows] = useState(VegetablesRows);
  const [Substring, setSubstring] = useState("");

  const handleChangeSubstring = (event: ChangeEvent<HTMLInputElement>) => {
    setSubstring(event.target.value);
  };

  const handleChangeFilter = () => {
    setFruitsFilterRows(filterRows(FruitsRows, Substring));
    setVegetablesFilterRows(filterRows(VegetablesRows, Substring));
  };

  const renderSearchBox = () => (
    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
      <SearchIcon sx={{ mr: 1, my: 0.5 }} />
      <TextField label="Search..." variant="standard" onChange={handleChangeSubstring} style={{ paddingRight: "10px" }} />
      <Button variant="outlined" onClick={handleChangeFilter}>
        Filter
      </Button>
    </Box>
  );

  const renderTable = (Title: string, rows: MyDict) => (
    <Box marginTop={4}>
      <Typography variant="h6" gutterBottom>
        {Title}
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(rows).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell size="small">{key}</TableCell>
                <TableCell size="small">{value}</TableCell>
                <TableCell rowSpan={3} />
                <TableCell rowSpan={3} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  return (
    <Box style={{ backgroundColor: "lightgray", height: "100vh", padding: "5%" }}>
      {renderSearchBox()}
      <FormControlLabel control={<Checkbox />} label="Only show products in stock" />
      <Box style={{ margin: "5%" }}>
        {renderTable("Fruits", FruitsFilterRows)}
        {renderTable("Vegetables", VegetablesFilterRows)}
      </Box>
    </Box>
  );
}
