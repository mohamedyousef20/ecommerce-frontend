import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography, Autocomplete } from "@mui/material";

const Address = ({ formData, setFormData }) => {
    
    const [errors, setErrors] = useState({});

    const cityStateMapping = {
        Cairo: [
            "Nasr City",
            "Heliopolis",
            "Maadi",
            "Zamalek",
            "Shubra",
            "New Cairo",
            "6th of October",
            "Giza",
            "Downtown",
            "El Marg",
            "Helwan",
        ],
        Giza: [
            "Dokki",
            "Mohandessin",
            "6th of October",
            "Haram",
            "Imbaba",
            "Faisal",
            "Sheikh Zayed",
            "Al Badrashin",
            "Abu Rawash",
            "El Wahat El Baharia",
        ],
        Alexandria: [
            "Smouha",
            "Montaza",
            "Borg El Arab",
            "Sidi Gaber",
            "El Raml",
            "Karmouz",
            "El Mandara",
            "Agami",
            "Amreya",
            "El Max",
        ],
        Sohag: ["Akhmim", "Girga", "Tahta", "El Maragha", "El Balyana", "Dar El Salam"],
        Assiut: [
            "Dairut",
            "Manfalut",
            "El Badari",
            "Abnoub",
            "Abu Tig",
            "Sahel Selim",
            "El Quseya",
        ],
        Aswan: ["Edfu", "Kom Ombo", "Daraw", "Abu Simbel", "El Sebaiya"],
        Luxor: ["Esna", "Armant", "New Valley", "El Tod"],
        PortSaid: ["El Manakh", "El Zohur", "Port Fouad", "El Arab", "El Dawahy"],
        Ismailia: ["Fayed", "Qantara", "El Tal El Kabir", "Abu Sultan"],
        Suez: ["El Ganayen", "El Arbeen", "Faisal"],
        Sharkia: [
            "Zagazig",
            "Belbeis",
            "Abu Kabir",
            "El Husseiniya",
            "Minya El Qamh",
            "Kafr Saqr",
        ],
        Dakahlia: [
            "Mansoura",
            "Talkha",
            "Mit Ghamr",
            "El Senbellawein",
            "El Gamaliya",
            "Belqas",
        ],
        Qena: ["Qus", "Nag Hammadi", "Deshna", "Farshut", "El Waqf"],
        Beheira: [
            "Damanhour",
            "Kafr El Dawwar",
            "Rashid",
            "Shubrakhit",
            "Itay El Barud",
            "Edku",
        ],
        Monufia: [
            "Shibin El Kom",
            "Menouf",
            "Tala",
            "Bagour",
            "Ashmoun",
            "Sadat City",
        ],
        Fayoum: ["Ibshaway", "Tamiya", "Sinnuris", "Youssef El Seddik", "Etsa"],
        BeniSuef: ["El Wasta", "Biba", "Nasser", "Ehnasia", "Somosta"],
        Minya: [
            "Mallawi",
            "Samalut",
            "Deir Mawas",
            "Beni Mazar",
            "Abu Qurqas",
            "Maghagha",
        ],
        RedSea: ["Hurghada", "Marsa Alam", "Safaga", "El Quseir", "Ras Ghareb"],
        NorthSinai: ["Arish", "Rafah", "Bir al-Abed", "Sheikh Zuweid", "Nakhl"],
        SouthSinai: [
            "Sharm El Sheikh",
            "Dahab",
            "Taba",
            "Nuweiba",
            "Tor Sinai",
            "Saint Catherine",
        ],
        Matruh: ["Marsah Matruh", "El Alamein", "Sidi Barrani", "El Salloum", "Siwa"],
        Qalyubia: [
            "Banha",
            "Shibin El Qanater",
            "Toukh",
            "Qalyub",
            "El Khanka",
            "Kafr Shukr",
        ],
        KafrElSheikh: [
            "Kafr El Sheikh",
            "Desouk",
            "Fuwah",
            "Sidi Salem",
            "Baltim",
            "El Hamoul",
        ],
        Gharbia: [
            "Tanta",
            "El Mahalla El Kubra",
            "Kafr El Zayat",
            "Zifta",
            "Samanoud",
            "Basyoun",
        ],
        Damietta: ["Damietta", "Ras El Bar", "Kafr Saad", "Kafr El Battikh", "Faraskour"],
        NewValley: ["Kharga", "Dakhla", "Farafra", "Balat"],
    };

    const cities = Object.keys(cityStateMapping);

    const handleChange = (name, value) => {
        if (name === "city") {
            setFormData({ ...formData, city: value, state: "" });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };



    const validateForm = () => {
        const newErrors = {};
        if (!formData.street) newErrors.street = "Street address is required.";
        if (!formData.city) newErrors.city = "City is required.";
        if (!formData.state) newErrors.state = "State is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form Data Submitted:", formData);
            alert("Address submitted successfully!");
        }
    };

    return (
        <Box
            sx={{
                p: 3,
                maxWidth: 600,
                mx: "auto",
                bgcolor: "#FAFAFA",
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            <Typography
                variant="h5"
                sx={{ mb: 2, textAlign: "center", fontWeight: 600 }}
            >
                Address Form
            </Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Street Address"
                            name="street"
                            placeholder="25 Zahrae-Elmoalemeen St"
                            value={formData.street}
                            onChange={(e) => handleChange("street", e.target.value)}
                            error={!!errors.street}
                            helperText={errors.street}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                            freeSolo
                            options={cities}
                            value={formData.city}
                            onChange={(e, newValue) => handleChange("city", newValue)}
                            inputValue={formData.city}
                            onInputChange={(e, newInputValue) => handleChange("city", newInputValue)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="City"
                                    error={!!errors.city}
                                    helperText={errors.city}
                                    variant="outlined"
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                            freeSolo
                            options={formData.city ? cityStateMapping[formData.city] || [] : []}
                            value={formData.state}
                            onChange={(e, newValue) => handleChange("state", newValue)}
                            inputValue={formData.state}
                            onInputChange={(e, newInputValue) => handleChange("state", newInputValue)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="State"
                                    error={!!errors.state}
                                    helperText={errors.state}
                                    variant="outlined"
                                    disabled={!formData.city}
                                />
                            )}
                        />
                    </Grid>
                </Grid>

                {/* <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                        mt: 3,
                        bgcolor: "#3B82F6",
                        "&:hover": { bgcolor: "#374151" },
                    }}
                >
                    Submit Address
                </Button> */}
            </form>
        </Box>
    );
};

export default Address;
