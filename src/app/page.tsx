"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

// MUI components (you'll need to install these dependencies)
// npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
const AppBar = dynamic(() => import("@mui/material/AppBar"), { ssr: false });
const Toolbar = dynamic(() => import("@mui/material/Toolbar"), { ssr: false });
const Typography = dynamic(() => import("@mui/material/Typography"), {
  ssr: false,
});
const IconButton = dynamic(() => import("@mui/material/IconButton"), {
  ssr: false,
});
const Box = dynamic(() => import("@mui/material/Box"), { ssr: false });
const Card = dynamic(() => import("@mui/material/Card"), { ssr: false });
const CardContent = dynamic(() => import("@mui/material/CardContent"), {
  ssr: false,
});
const Divider = dynamic(() => import("@mui/material/Divider"), { ssr: false });
const Tabs = dynamic(() => import("@mui/material/Tabs"), { ssr: false });
const Tab = dynamic(() => import("@mui/material/Tab"), { ssr: false });
const Grid = dynamic(() => import("@mui/material/Grid"), { ssr: false });
const Paper = dynamic(() => import("@mui/material/Paper"), { ssr: false });
const Switch = dynamic(() => import("@mui/material/Switch"), { ssr: false });
const Button = dynamic(() => import("@mui/material/Button"), { ssr: false });
const Fade = dynamic(() => import("@mui/material/Fade"), { ssr: false });
const Chip = dynamic(() => import("@mui/material/Chip"), { ssr: false });

// MUI icons
const ArrowBackIcon = dynamic(() => import("@mui/icons-material/ArrowBack"), {
  ssr: false,
});
const HelpIcon = dynamic(() => import("@mui/icons-material/Help"), {
  ssr: false,
});
const RestaurantIcon = dynamic(() => import("@mui/icons-material/Restaurant"), {
  ssr: false,
});
const LocalBarIcon = dynamic(() => import("@mui/icons-material/LocalBar"), {
  ssr: false,
});
const ShoppingCartCheckoutIcon = dynamic(
  () => import("@mui/icons-material/ShoppingCartCheckout"),
  { ssr: false }
);

// Updated image paths to use local files from the public/image folder
const mockData = {
  mainCourse: [
    {
      name: "Rice",
      image: "/image/maincourse/rice.webp",
      alt: "Steamed white rice",
    },
    {
      name: "Dal",
      image: "/image/maincourse/pulse.avif",
      alt: "Indian lentil dal",
    },
    {
      name: "Roti",
      image: "/image/maincourse/roti.webp",
      alt: "Indian flatbread roti",
    },
    {
      name: "Mixed Vegetable Curry",
      image: "/image/maincourse/vegetable.webp",
      alt: "Mixed vegetable curry",
    },
    {
      name: "Paneer Butter Masala",
      image: "/image/maincourse/paneer.avif",
      alt: "Paneer butter masala",
    },
  ],
  starters: [
    {
      name: "Samosa",
      image: "/image/starter/samosa.webp",
      alt: "Crispy samosa",
    },
    {
      name: "Pakora",
      image: "/image/starter/pakora.webp",
      alt: "Assorted pakoras",
    },
    {
      name: "Aloo Tikki",
      image: "/image/starter/Alootikki.webp",
      alt: "Spiced aloo tikki",
    },
    {
      name: "Paneer Tikka",
      image: "/image/starter/Paneer Tikka.webp",
      alt: "Grilled paneer tikka",
    },
  ],
  desserts: [
    {
      name: "Gulab Jamun",
      image: "/image/desert/Gulab Jamun.webp",
      alt: "Sweet gulab jamun",
    },
    {
      name: "Kheer",
      image: "/image/desert/Kheer.webp",
      alt: "Indian rice pudding kheer",
    },
    {
      name: "Rasgulla",
      image: "/image/desert/Rasgulla.webp",
      alt: "Soft rasgulla",
    },
    {
      name: "Ice Cream",
      image: "/image/desert/Icecream.webp",
      alt: "Vanilla ice cream",
    },
  ],
  beverages: [
    {
      name: "Lassi",
      image: "/image/beverages/lassi.webp",
      alt: "Traditional lassi drink",
    },
    {
      name: "Masala Chai",
      image: "/image/beverages/Masala Chai.webp",
      alt: "Indian masala chai",
    },
    {
      name: "Jaljeera",
      image: "/image/beverages/Jaljeera.webp",
      alt: "Jaljeera in glass",
    },
    {
      name: "Buttermilk",
      image: "/image/beverages/Buttermilk.webp",
      alt: "Chilled buttermilk",
    },
  ],
};

interface FoodState {
  [key: string]: boolean | string | null;
  beverage: string | null;
}

export default function ThaliBuilder() {
  // Tab state
  const [selectedTab, setSelectedTab] = useState(0);

  // Initialize food state with all items set to false
  const initialFoodState: FoodState = {
    beverage: null,
  };

  // Add all food items from mock data to the state
  Object.keys(mockData).forEach((category) => {
    mockData[category as keyof typeof mockData].forEach((item) => {
      initialFoodState[item.name.toLowerCase().replace(/\s+/g, "_")] = false;
    });
  });

  const [foodState, setFoodState] = useState<FoodState>(initialFoodState);

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  // Toggle food item
  const toggleFoodItem = (item: string) => {
    const key = item.toLowerCase().replace(/\s+/g, "_");
    setFoodState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Set beverage
  const setBeverage = (drink: string) => {
    const key = drink.toLowerCase().replace(/\s+/g, "_");
    setFoodState((prev) => ({
      ...prev,
      beverage: prev.beverage === key ? null : key,
    }));
  };

  // Map tab index to category
  const getCategoryByIndex = (index: number): string => {
    const categories = Object.keys(mockData);
    return categories[index];
  };

  // Get selected items count
  const getSelectedCount = (): number => {
    return Object.entries(foodState).reduce((count, [key, value]) => {
      if (key !== "beverage" && value === true) {
        return count + 1;
      }
      return count;
    }, 0);
  };

  return (
    <Box sx={{ flexGrow: 1, pb: 8 }}>
      {/* App Bar */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="back"
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
            Build Your Thali
          </Typography>
          <IconButton size="large" edge="end" color="inherit" aria-label="help">
            <HelpIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Thali Visualization */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Card
          sx={{
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            position: "relative",
            mx: "auto",
            boxShadow: 3,
            backgroundColor: "#f5f5dc",
          }}
        >
          <CardContent
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "relative",
              p: 0,
              "&:last-child": { pb: 0 },
            }}
          >
            {/* Visual representation of selected food items */}
            {Object.entries(foodState).map(([key, isSelected]) => {
              if (key === "beverage" || !isSelected) return null;

              // Find the item details from mockData
              let itemDetails = null;
              let category = "";

              for (const cat of Object.keys(mockData)) {
                const found = mockData[cat as keyof typeof mockData].find(
                  (item) => item.name.toLowerCase().replace(/\s+/g, "_") === key
                );
                if (found) {
                  itemDetails = found;
                  category = cat;
                  break;
                }
              }

              if (!itemDetails) return null;

              // Calculate position based on item type and order
              let position = {};
              if (category === "mainCourse") {
                // Position main course items around the center
                const mainCourseItems = Object.entries(foodState).filter(
                  ([k, v]) =>
                    v &&
                    k !== "beverage" &&
                    mockData.mainCourse.some(
                      (item) =>
                        item.name.toLowerCase().replace(/\s+/g, "_") === k
                    )
                );

                const index = mainCourseItems.findIndex(([k]) => k === key);
                const totalItems = mainCourseItems.length;
                const angle = (index / totalItems) * 2 * Math.PI;

                position = {
                  top: `${50 - 35 * Math.cos(angle)}%`,
                  left: `${50 + 35 * Math.sin(angle)}%`,
                  width: "40%",
                  height: "40%",
                  zIndex: 10,
                };
              } else if (category === "starters") {
                // Position starters at the edges
                const starterItems = Object.entries(foodState).filter(
                  ([k, v]) =>
                    v &&
                    k !== "beverage" &&
                    mockData.starters.some(
                      (item) =>
                        item.name.toLowerCase().replace(/\s+/g, "_") === k
                    )
                );

                const index = starterItems.findIndex(([k]) => k === key);
                const totalItems = starterItems.length;
                const angle = (index / totalItems) * 2 * Math.PI;

                position = {
                  top: `${50 - 40 * Math.cos(angle)}%`,
                  left: `${50 + 40 * Math.sin(angle)}%`,
                  width: "25%",
                  height: "25%",
                  zIndex: 5,
                };
              } else if (category === "desserts") {
                // Position desserts in the center area
                const dessertItems = Object.entries(foodState).filter(
                  ([k, v]) =>
                    v &&
                    k !== "beverage" &&
                    mockData.desserts.some(
                      (item) =>
                        item.name.toLowerCase().replace(/\s+/g, "_") === k
                    )
                );

                const index = dessertItems.findIndex(([k]) => k === key);

                if (index === 0) {
                  position = {
                    top: "40%",
                    left: "40%",
                    width: "20%",
                    height: "20%",
                    zIndex: 15,
                  };
                } else {
                  const angle =
                    ((index - 1) / (dessertItems.length - 1)) * Math.PI;
                  position = {
                    top: `${50 - 25 * Math.cos(angle)}%`,
                    left: `${50 + 25 * Math.sin(angle)}%`,
                    width: "20%",
                    height: "20%",
                    zIndex: 15,
                  };
                }
              }

              return (
                <Fade key={key} in={!!isSelected}>
                  <Box
                    sx={{
                      position: "absolute",
                      ...position,
                      borderRadius: "50%",
                      overflow: "hidden",
                      boxShadow: 1,
                    }}
                  >
                    <Image
                      src={itemDetails.image}
                      alt={itemDetails.alt}
                      fill
                      sizes="(max-width: 500px) 100px, 150px"
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                </Fade>
              );
            })}
          </CardContent>
        </Card>

        {/* Beverage visualization */}
        {foodState.beverage && (
          <Fade in={!!foodState.beverage}>
            <Box
              sx={{
                position: "absolute",
                right: "15%",
                bottom: "10%",
                width: "60px",
                height: "100px",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: 2,
              }}
            >
              {Object.entries(mockData.beverages).map(([, item]) => {
                const key = item.name.toLowerCase().replace(/\s+/g, "_");
                if (foodState.beverage === key) {
                  return (
                    <Image
                      key={key}
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="60px"
                      style={{ objectFit: "cover" }}
                    />
                  );
                }
                return null;
              })}
            </Box>
          </Fade>
        )}
      </Box>

      {/* Selected items count chip */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 1, mb: 2 }}>
        <Chip
          label={`${getSelectedCount()} items selected`}
          color="primary"
          variant="outlined"
          icon={<RestaurantIcon />}
        />
      </Box>

      <Divider sx={{ my: 1 }} />

      {/* Menu Categories */}
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="food categories"
          sx={{ mb: 2 }}
        >
          <Tab label="Main Course" />
          <Tab label="Starters" />
          <Tab label="Desserts" />
          <Tab label="Beverages" />
        </Tabs>

        {/* Menu Items */}
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2}>
            {mockData[
              getCategoryByIndex(selectedTab) as keyof typeof mockData
            ].map((item) => {
              const itemKey = item.name.toLowerCase().replace(/\s+/g, "_");
              const isSelected =
                selectedTab === 3
                  ? foodState.beverage === itemKey
                  : foodState[itemKey];

              return (
                <Grid key={itemKey}>
                  <Paper
                    elevation={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                      bgcolor: isSelected
                        ? "action.selected"
                        : "background.paper",
                      "&:hover": {
                        bgcolor: "action.hover",
                      },
                      borderRadius: 2,
                      overflow: "hidden",
                      height: "180px",
                      position: "relative",
                    }}
                    onClick={() =>
                      selectedTab === 3
                        ? setBeverage(item.name)
                        : toggleFoodItem(item.name)
                    }
                  >
                    <Box sx={{ height: "120px", position: "relative" }}>
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 600px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                    <Box
                      sx={{
                        p: 1.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: isSelected ? "bold" : "normal" }}
                      >
                        {item.name}
                      </Typography>

                      {selectedTab !== 3 && (
                        <Switch
                          checked={isSelected as boolean}
                          onClick={(e) => e.stopPropagation()}
                          onChange={() => toggleFoodItem(item.name)}
                          size="small"
                        />
                      )}

                      {selectedTab === 3 && (
                        <LocalBarIcon
                          color={isSelected ? "primary" : "action"}
                        />
                      )}
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>

      {/* Confirm Button */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
          bgcolor: "background.paper",
          borderTop: "1px solid",
          borderColor: "divider",
          zIndex: 1100,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          startIcon={<ShoppingCartCheckoutIcon />}
          sx={{ borderRadius: 2, py: 1.5 }}
        >
          Confirm Thali
        </Button>
      </Box>
    </Box>
  );
}
