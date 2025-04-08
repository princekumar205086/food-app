"use client";

import React, { useState, useEffect } from "react";
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
const Badge = dynamic(() => import("@mui/material/Badge"), { ssr: false });
const Drawer = dynamic(() => import("@mui/material/Drawer"), { ssr: false });
const List = dynamic(() => import("@mui/material/List"), { ssr: false });
const ListItem = dynamic(() => import("@mui/material/ListItem"), {
  ssr: false,
});
const ListItemText = dynamic(() => import("@mui/material/ListItemText"), {
  ssr: false,
});
const ListItemAvatar = dynamic(() => import("@mui/material/ListItemAvatar"), {
  ssr: false,
});
const Avatar = dynamic(() => import("@mui/material/Avatar"), { ssr: false });
const ButtonGroup = dynamic(() => import("@mui/material/ButtonGroup"), {
  ssr: false,
});

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
const AddIcon = dynamic(() => import("@mui/icons-material/Add"), {
  ssr: false,
});
const RemoveIcon = dynamic(() => import("@mui/icons-material/Remove"), {
  ssr: false,
});
const ShoppingCartIcon = dynamic(
  () => import("@mui/icons-material/ShoppingCart"),
  {
    ssr: false,
  }
);

// Updated mockData to include price
const mockData = {
  mainCourse: [
    {
      name: "Rice",
      image: "/image/maincourse/rice.webp",
      alt: "Steamed white rice",
      price: 60,
    },
    {
      name: "Dal",
      image: "/image/maincourse/pulse.avif",
      alt: "Indian lentil dal",
      price: 80,
    },
    {
      name: "Roti",
      image: "/image/maincourse/roti.webp",
      alt: "Indian flatbread roti",
      price: 20,
    },
    {
      name: "Mixed Vegetable Curry",
      image: "/image/maincourse/vegetable.webp",
      alt: "Mixed vegetable curry",
      price: 120,
    },
    {
      name: "Paneer Butter Masala",
      image: "/image/maincourse/paneer.avif",
      alt: "Paneer butter masala",
      price: 160,
    },
  ],
  starters: [
    {
      name: "Samosa",
      image: "/image/starter/samosa.webp",
      alt: "Crispy samosa",
      price: 40,
    },
    {
      name: "Pakora",
      image: "/image/starter/pakora.webp",
      alt: "Assorted pakoras",
      price: 50,
    },
    {
      name: "Aloo Tikki",
      image: "/image/starter/Alootikki.webp",
      alt: "Spiced aloo tikki",
      price: 60,
    },
    {
      name: "Paneer Tikka",
      image: "/image/starter/Paneer Tikka.webp",
      alt: "Grilled paneer tikka",
      price: 140,
    },
  ],
  desserts: [
    {
      name: "Gulab Jamun",
      image: "/image/desert/Gulab Jamun.webp",
      alt: "Sweet gulab jamun",
      price: 40,
    },
    {
      name: "Kheer",
      image: "/image/desert/Kheer.webp",
      alt: "Indian rice pudding kheer",
      price: 60,
    },
    {
      name: "Rasgulla",
      image: "/image/desert/Rasgulla.webp",
      alt: "Soft rasgulla",
      price: 45,
    },
    {
      name: "Ice Cream",
      image: "/image/desert/Icecream.webp",
      alt: "Vanilla ice cream",
      price: 50,
    },
  ],
  beverages: [
    {
      name: "Lassi",
      image: "/image/beverages/lassi.webp",
      alt: "Traditional lassi drink",
      price: 40,
    },
    {
      name: "Masala Chai",
      image: "/image/beverages/Masala Chai.webp",
      alt: "Indian masala chai",
      price: 30,
    },
    {
      name: "Jaljeera",
      image: "/image/beverages/Jaljeera.webp",
      alt: "Jaljeera in glass",
      price: 25,
    },
    {
      name: "Buttermilk",
      image: "/image/beverages/Buttermilk.webp",
      alt: "Chilled buttermilk",
      price: 35,
    },
  ],
};

interface FoodState {
  [key: string]: boolean | string | null | number;
  beverage: string | null;
}

interface FoodItem {
  name: string;
  image: string;
  alt: string;
  price: number;
  quantity?: number;
}

export default function ThaliBuilder() {
  // Tab state
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);
  const [selectedItemsDrawerOpen, setSelectedItemsDrawerOpen] = useState(false);

  // Initialize food state with all items set to false and quantities to 0
  const initialFoodState: FoodState = {
    beverage: null,
  };

  // Add all food items from mock data to the state
  Object.keys(mockData).forEach((category) => {
    mockData[category as keyof typeof mockData].forEach((item) => {
      const key = item.name.toLowerCase().replace(/\s+/g, "_");
      initialFoodState[key] = false;
      initialFoodState[`${key}_qty`] = 1; // Default quantity is 1
    });
  });

  const [foodState, setFoodState] = useState<FoodState>(initialFoodState);

  // Simulate loading state for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

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

  // Update quantity
  const updateQuantity = (item: string, delta: number) => {
    const key = item.toLowerCase().replace(/\s+/g, "_");
    const qtyKey = `${key}_qty`;

    setFoodState((prev) => {
      const currentQty = Number(prev[qtyKey]) || 1;
      const newQty = Math.max(1, currentQty + delta); // Ensure quantity doesn't go below 1

      return {
        ...prev,
        [qtyKey]: newQty,
      };
    });
  };

  // Get selected food items with details
  const getSelectedItems = (): FoodItem[] => {
    const selectedItems: FoodItem[] = [];

    // Add regular food items
    Object.entries(foodState).forEach(([key, isSelected]) => {
      if (
        key !== "beverage" &&
        key.indexOf("_qty") === -1 &&
        isSelected === true
      ) {
        const qtyKey = `${key}_qty`;
        const quantity = Number(foodState[qtyKey]) || 1;

        // Find the item in mockData
        for (const category of Object.keys(mockData)) {
          const found = mockData[category as keyof typeof mockData].find(
            (item) => item.name.toLowerCase().replace(/\s+/g, "_") === key
          );

          if (found) {
            selectedItems.push({
              ...found,
              quantity,
            });
            break;
          }
        }
      }
    });

    // Add beverage if selected
    if (foodState.beverage) {
      const beverageKey = foodState.beverage as string;
      const qtyKey = `${beverageKey}_qty`;
      const quantity = Number(foodState[qtyKey]) || 1;

      const beverageItem = mockData.beverages.find(
        (item) => item.name.toLowerCase().replace(/\s+/g, "_") === beverageKey
      );

      if (beverageItem) {
        selectedItems.push({
          ...beverageItem,
          quantity,
        });
      }
    }

    return selectedItems;
  };

  // Calculate total price
  const calculateTotal = (): number => {
    const selectedItems = getSelectedItems();
    return selectedItems.reduce((total, item) => {
      return total + item.price * (item.quantity || 1);
    }, 0);
  };

  // Remove item function
  const removeItem = (item: string) => {
    const key = item.toLowerCase().replace(/\s+/g, "_");

    // If it's a beverage, clear the beverage selection
    if (foodState.beverage === key) {
      setFoodState((prev) => ({
        ...prev,
        beverage: null,
      }));
    } else {
      // Otherwise, just set the item to false
      setFoodState((prev) => ({
        ...prev,
        [key]: false,
      }));
    }
  };

  // Reset all selections
  const resetSelections = () => {
    setFoodState((prev) => {
      const resetState = { ...prev, beverage: null } as FoodState;

      // Reset all food items to false but keep quantity values
      Object.keys(resetState).forEach((key) => {
        if (key !== "beverage" && !key.includes("_qty")) {
          resetState[key] = false;
        }
      });

      return resetState;
    });
  };

  // Confirm reset with dialog
  const handleResetPlate = () => {
    if (getSelectedCount() > 0 || foodState.beverage) {
      if (window.confirm("Are you sure you want to clear all selections?")) {
        resetSelections();
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1, pb: 10, maxWidth: "100vw", overflowX: "hidden" }}>
      {/* App Bar */}
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar sx={{ minHeight: { xs: "56px", sm: "64px" } }}>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="back"
            sx={{ mr: 1 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              fontSize: { xs: "1.1rem", sm: "1.25rem" },
            }}
          >
            Build Your Thali
          </Typography>
          <IconButton
            size="medium"
            edge="end"
            color="inherit"
            aria-label="cart"
            onClick={() => setOrderSummaryOpen(true)}
            sx={{ mr: 1 }}
          >
            <Badge
              badgeContent={getSelectedCount()}
              color="error"
              overlap="circular"
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="medium"
            edge="end"
            color="inherit"
            aria-label="help"
          >
            <HelpIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Thali Visualization with Reset Button */}
      <Box
        sx={{
          p: { xs: 2, sm: 3 },
          display: "flex",
          justifyContent: "center",
          position: "relative",
          mt: { xs: 1, sm: 2 },
        }}
      >
        {loading ? (
          <Box
            sx={{
              width: { xs: "250px", sm: "280px" },
              height: { xs: "250px", sm: "280px" },
              borderRadius: "50%",
              backgroundColor: "#f0f0f0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography color="text.secondary">Loading...</Typography>
          </Box>
        ) : (
          <>
            <Card
              sx={{
                width: { xs: "250px", sm: "280px" },
                height: { xs: "250px", sm: "280px" },
                borderRadius: "50%",
                position: "relative",
                mx: "auto",
                boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                backgroundColor: "#f8f5e6",
                transition: "all 0.3s ease-in-out",
                border: "4px solid #e6e0c5",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: "5%",
                  left: "5%",
                  right: "5%",
                  bottom: "5%",
                  borderRadius: "50%",
                  border: "1px dashed rgba(0,0,0,0.1)",
                  zIndex: 2,
                },
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
                      (item) =>
                        item.name.toLowerCase().replace(/\s+/g, "_") === key
                    );
                    if (found) {
                      itemDetails = found;
                      category = cat;
                      break;
                    }
                  }

                  if (!itemDetails) return null;

                  // Calculate position based on item type and order
                  let position: { [key: string]: string | number } = {};
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
                    const totalItems = mainCourseItems.length || 1;
                    const angle = (index / totalItems) * 2 * Math.PI;
                    const distance = totalItems === 1 ? 0 : 30;

                    position = {
                      top: `${50 - distance * Math.cos(angle)}%`,
                      left: `${50 + distance * Math.sin(angle)}%`,
                      width: totalItems === 1 ? "60%" : "36%",
                      height: totalItems === 1 ? "60%" : "36%",
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
                    const totalItems = starterItems.length || 1;
                    const angle = (index / totalItems) * 2 * Math.PI;

                    position = {
                      top: `${50 - 38 * Math.cos(angle)}%`,
                      left: `${50 + 38 * Math.sin(angle)}%`,
                      width: "24%",
                      height: "24%",
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
                    const totalItems = dessertItems.length || 1;

                    if (totalItems === 1) {
                      position = {
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "30%",
                        height: "30%",
                        zIndex: 15,
                      };
                    } else {
                      const angle = (index / totalItems) * 2 * Math.PI;
                      position = {
                        top: `${50 - 20 * Math.cos(angle)}%`,
                        left: `${50 + 20 * Math.sin(angle)}%`,
                        width: "22%",
                        height: "22%",
                        zIndex: 15,
                      };
                    }
                  }

                  return (
                    <Fade key={key} in={!!isSelected} timeout={400}>
                      <Box
                        sx={{
                          position: "absolute",
                          ...position,
                          borderRadius: "50%",
                          overflow: "hidden",
                          boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
                          border: "2px solid #fff",
                          transform: position.transform || "none",
                        }}
                      >
                        <Image
                          src={itemDetails.image}
                          alt={itemDetails.alt}
                          fill
                          sizes="(max-width: 500px) 100px, 150px"
                          style={{ objectFit: "cover" }}
                          quality={80}
                          priority={category === "mainCourse"}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0,0,0,0.05)",
                            zIndex: 1,
                          }}
                        />
                      </Box>
                    </Fade>
                  );
                })}
              </CardContent>
            </Card>

            {/* Reset button - only show when items are selected */}
            {(getSelectedCount() > 0 || foodState.beverage) && (
              <Fade in={true}>
                <IconButton
                  onClick={handleResetPlate}
                  size="small"
                  aria-label="reset plate"
                  sx={{
                    position: "absolute",
                    top: { xs: 0, sm: 10 },
                    right: { xs: 0, sm: 10 },
                    bgcolor: "error.light",
                    color: "white",
                    width: { xs: 32, sm: 36 },
                    height: { xs: 32, sm: 36 },
                    "&:hover": {
                      bgcolor: "error.main",
                    },
                    zIndex: 5,
                    boxShadow: 2,
                  }}
                >
                  <RestaurantIcon
                    fontSize="small"
                    sx={{ transform: "rotate(45deg)" }}
                  />
                </IconButton>
              </Fade>
            )}
          </>
        )}

        {/* Beverage visualization */}
        {foodState.beverage && (
          <Fade in={!!foodState.beverage} timeout={500}>
            <Box
              sx={{
                position: "absolute",
                right: { xs: "5%", sm: "15%" },
                bottom: { xs: "5%", sm: "10%" },
                width: { xs: "50px", sm: "60px" },
                height: { xs: "80px", sm: "100px" },
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                border: "2px solid #fff",
                transition: "all 0.3s ease",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 2,
                  boxShadow: "inset 0 0 10px rgba(255,255,255,0.3)",
                  pointerEvents: "none",
                },
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
                      sizes="(max-width: 600px) 50px, 60px"
                      style={{ objectFit: "cover" }}
                      quality={80}
                    />
                  );
                }
                return null;
              })}
            </Box>
          </Fade>
        )}
      </Box>

      {/* Selected items count chip - Now clickable to open drawer */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 1, mb: 2 }}>
        <Chip
          label={`${getSelectedCount()} items selected • ₹${calculateTotal()}`}
          color="primary"
          variant={getSelectedCount() > 0 ? "filled" : "outlined"}
          icon={<RestaurantIcon />}
          onClick={() => setSelectedItemsDrawerOpen(true)}
          sx={{
            py: 0.5,
            height: "auto",
            "& .MuiChip-icon": { fontSize: "1.2rem" },
            cursor: "pointer",
            "&:hover": {
              boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
              transform: "translateY(-1px)",
              transition: "all 0.2s ease",
            },
            fontSize: { xs: "0.8rem", sm: "0.875rem" },
            borderRadius: "50px",
            fontWeight: getSelectedCount() > 0 ? 500 : 400,
          }}
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
          sx={{
            mb: 2,
            "& .MuiTab-root": {
              minWidth: { xs: "80px", sm: "120px" },
              py: 1,
              textTransform: "none",
              fontSize: { xs: "0.875rem", sm: "1rem" },
            },
          }}
        >
          <Tab
            icon={<RestaurantIcon fontSize="small" />}
            iconPosition="start"
            label="Main Course"
          />
          <Tab
            icon={<LocalBarIcon fontSize="small" />}
            iconPosition="start"
            label="Starters"
          />
          <Tab
            icon={<LocalBarIcon fontSize="small" />}
            iconPosition="start"
            label="Desserts"
          />
          <Tab
            icon={<LocalBarIcon fontSize="small" />}
            iconPosition="start"
            label="Beverages"
          />
        </Tabs>

        {/* Menu Items */}
        <Box sx={{ px: { xs: 1, sm: 2 }, pb: 2 }}>
          <Grid container spacing={2}>
            {mockData[
              getCategoryByIndex(selectedTab) as keyof typeof mockData
            ].map((item) => {
              const itemKey = item.name.toLowerCase().replace(/\s+/g, "_");
              const isSelected =
                selectedTab === 3
                  ? foodState.beverage === itemKey
                  : foodState[itemKey];
              const qtyKey = `${itemKey}_qty`;
              const quantity = Number(foodState[qtyKey]) || 1;

              return (
                <Grid
                  key={itemKey}
                  sx={{ width: { xs: "50%", sm: "33.33%", md: "25%" } }}
                >
                  <Paper
                    elevation={isSelected ? 3 : 1}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                      bgcolor: isSelected
                        ? "action.selected"
                        : "background.paper",
                      "&:hover": {
                        bgcolor: "action.hover",
                        transform: "translateY(-2px)",
                        transition: "transform 0.2s ease",
                      },
                      borderRadius: 2,
                      overflow: "hidden",
                      height: { xs: "180px", sm: "200px" },
                      position: "relative",
                      transition: "all 0.2s ease",
                      border: isSelected ? "1px solid" : "none",
                      borderColor: "primary.light",
                    }}
                    onClick={() =>
                      selectedTab === 3
                        ? setBeverage(item.name)
                        : toggleFoodItem(item.name)
                    }
                  >
                    <Box
                      sx={{
                        height: { xs: "100px", sm: "120px" },
                        position: "relative",
                        "&::after": isSelected
                          ? {
                              content: '""',
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              backgroundColor: "rgba(0,0,0,0.1)",
                              zIndex: 1,
                            }
                          : {},
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 600px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                        quality={75}
                      />
                      {isSelected && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            bgcolor: "primary.main",
                            color: "white",
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 2,
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                          }}
                        >
                          ✓
                        </Box>
                      )}
                    </Box>
                    <Box
                      sx={{
                        p: 1.5,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        flexGrow: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: isSelected ? "bold" : "normal",
                            fontSize: { xs: "0.85rem", sm: "0.95rem" },
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          color="primary"
                          variant="body2"
                          sx={{ fontWeight: "bold" }}
                        >
                          ₹{item.price}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: 1,
                        }}
                      >
                        {isSelected ? (
                          <ButtonGroup
                            size="small"
                            onClick={(e) => e.stopPropagation()}
                            aria-label="quantity control"
                          >
                            <Button
                              onClick={() => updateQuantity(item.name, -1)}
                              size="small"
                            >
                              <RemoveIcon fontSize="small" />
                            </Button>
                            <Button disabled sx={{ px: 1, minWidth: "36px" }}>
                              {quantity}
                            </Button>
                            <Button
                              onClick={() => updateQuantity(item.name, 1)}
                              size="small"
                            >
                              <AddIcon fontSize="small" />
                            </Button>
                          </ButtonGroup>
                        ) : (
                          <Box />
                        )}

                        {selectedTab !== 3 && (
                          <Switch
                            checked={isSelected as boolean}
                            onClick={(e) => e.stopPropagation()}
                            onChange={() => toggleFoodItem(item.name)}
                            size="small"
                            color="primary"
                          />
                        )}

                        {selectedTab === 3 && (
                          <LocalBarIcon
                            color={isSelected ? "primary" : "action"}
                            fontSize="small"
                          />
                        )}
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>

      {/* Selected Items Drawer */}
      <Drawer
        anchor="bottom"
        open={selectedItemsDrawerOpen}
        onClose={() => setSelectedItemsDrawerOpen(false)}
        PaperProps={{
          sx: {
            maxHeight: "70vh",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            px: { xs: 1.5, sm: 2 },
            py: { xs: 1.5, sm: 2 },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            position: "sticky",
            top: 0,
            bgcolor: "background.paper",
            zIndex: 1,
            pb: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Selected Items
          </Typography>
          <Box>
            {getSelectedCount() > 0 && (
              <Button
                variant="text"
                color="error"
                size="small"
                onClick={handleResetPlate}
                sx={{
                  mr: 1,
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "0.8rem",
                }}
              >
                Clear All
              </Button>
            )}
            <IconButton
              onClick={() => setSelectedItemsDrawerOpen(false)}
              size="small"
              sx={{
                bgcolor: "action.hover",
                width: 28,
                height: 28,
              }}
            >
              <Typography sx={{ fontSize: "1.2rem", lineHeight: 1 }}>
                ×
              </Typography>
            </IconButton>
          </Box>
        </Box>

        {getSelectedItems().length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <RestaurantIcon sx={{ fontSize: "3rem", color: "text.disabled" }} />
            <Typography color="text.secondary">Your thali is empty</Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setSelectedItemsDrawerOpen(false);
                setSelectedTab(0); // Go to main course tab
              }}
              sx={{ mt: 1, textTransform: "none" }}
            >
              Start adding items
            </Button>
          </Box>
        ) : (
          <>
            <List
              sx={{ mb: 2, overflow: "auto", maxHeight: "calc(70vh - 150px)" }}
            >
              {getSelectedItems().map((item, index) => {
                const itemKey = item.name.toLowerCase().replace(/\s+/g, "_");
                const qtyKey = `${itemKey}_qty`;
                const quantity = Number(foodState[qtyKey]) || 1;

                return (
                  <ListItem
                    key={index}
                    sx={{
                      py: 1.5,
                      px: 0,
                      borderBottom:
                        index < getSelectedItems().length - 1
                          ? "1px solid"
                          : "none",
                      borderColor: "divider",
                    }}
                    secondaryAction={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <ButtonGroup
                          size="small"
                          variant="outlined"
                          sx={{ mr: 1.5 }}
                        >
                          <Button
                            onClick={() => updateQuantity(item.name, -1)}
                            size="small"
                            sx={{ minWidth: "30px", px: 0 }}
                          >
                            <RemoveIcon fontSize="small" />
                          </Button>
                          <Button disabled sx={{ px: 1, minWidth: "30px" }}>
                            {quantity}
                          </Button>
                          <Button
                            onClick={() => updateQuantity(item.name, 1)}
                            size="small"
                            sx={{ minWidth: "30px", px: 0 }}
                          >
                            <AddIcon fontSize="small" />
                          </Button>
                        </ButtonGroup>
                        <IconButton
                          edge="end"
                          aria-label="remove"
                          onClick={() => removeItem(item.name)}
                          size="small"
                          sx={{
                            color: "error.main",
                            width: 30,
                            height: 30,
                          }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          borderRadius: 2,
                          width: 40,
                          height: 40,
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <Image
                          src={item.image}
                          alt={item.alt}
                          fill
                          sizes="40px"
                          style={{ objectFit: "cover" }}
                        />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "calc(100% - 100px)",
                          }}
                        >
                          <Typography variant="caption">
                            ₹{item.price}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ fontWeight: "bold" }}
                          >
                            ₹{item.price * quantity}
                          </Typography>
                        </Box>
                      }
                      primaryTypographyProps={{
                        fontWeight: 500,
                        variant: "body2",
                      }}
                      secondaryTypographyProps={{
                        variant: "caption",
                        component: "div",
                      }}
                    />
                  </ListItem>
                );
              })}
            </List>

            <Box
              sx={{
                position: "sticky",
                bottom: 0,
                bgcolor: "background.paper",
                pt: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                  px: 1,
                }}
              >
                <Typography variant="subtitle2">Total Amount</Typography>
                <Typography
                  variant="subtitle1"
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                >
                  ₹{calculateTotal()}
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="medium"
                onClick={() => {
                  setSelectedItemsDrawerOpen(false);
                  setOrderSummaryOpen(true);
                }}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: 600,
                }}
                disabled={getSelectedCount() === 0}
              >
                Go to Checkout • ₹{calculateTotal()}
              </Button>
            </Box>
          </>
        )}
      </Drawer>

      {/* Order Summary Drawer */}
      <Drawer
        anchor="bottom"
        open={orderSummaryOpen}
        onClose={() => setOrderSummaryOpen(false)}
        PaperProps={{
          sx: {
            maxHeight: "70vh",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            px: 2,
            py: 3,
          },
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Order Summary
        </Typography>

        {getSelectedItems().length === 0 ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography color="text.secondary">
              No items selected yet
            </Typography>
          </Box>
        ) : (
          <List sx={{ mb: 2 }}>
            {getSelectedItems().map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  py: 2,
                  px: 0,
                  borderBottom:
                    index < getSelectedItems().length - 1
                      ? "1px solid"
                      : "none",
                  borderColor: "divider",
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ borderRadius: 2, width: 48, height: 48 }}>
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="48px"
                      style={{ objectFit: "cover" }}
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={`₹${item.price} × ${item.quantity}`}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  ₹{item.price * (item.quantity || 1)}
                </Typography>
              </ListItem>
            ))}
          </List>
        )}

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
            ₹{calculateTotal()}
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={() => setOrderSummaryOpen(false)}
          sx={{ mb: 1, borderRadius: 2, py: 1.5 }}
        >
          Continue Building
        </Button>

        <Button
          variant="outlined"
          fullWidth
          onClick={() =>
            alert(
              `Your order total is ₹${calculateTotal()}. Thank you for ordering!`
            )
          }
          sx={{ borderRadius: 2, py: 1.5 }}
          disabled={getSelectedItems().length === 0}
        >
          Proceed to Checkout
        </Button>
      </Drawer>

      {/* Confirm Button */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          p: { xs: 1.5, sm: 2 },
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
          sx={{
            borderRadius: 2,
            py: { xs: 1.2, sm: 1.5 },
            textTransform: "none",
            fontWeight: 600,
            boxShadow: 2,
          }}
          disabled={getSelectedCount() === 0}
          onClick={() => setOrderSummaryOpen(true)}
        >
          {getSelectedCount() > 0
            ? `Confirm Thali • ₹${calculateTotal()}`
            : "Select Items to Continue"}
        </Button>
      </Box>
    </Box>
  );
}
