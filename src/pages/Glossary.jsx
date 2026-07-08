import { useState } from "react";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SearchIcon from "@mui/icons-material/Search";

import glossary from "@data/glossary.es.yaml";
import { catColor } from "../theme";

// Glossary's Spanish labels normalise onto the app-wide category slugs in
// palette.category — one shared color vocabulary with events, instead of the
// old trick of overloading semantic colors (info/warning/...) per category.
const categorySlugs = {
  "Refugio/Protectora": "refugio",
  Plataforma: "plataforma",
  Rol: "rol",
  Evento: "evento",
};

// Chip color from the category swatch: filled chips get the swatch with its
// own contrastText; outlined chips borrow the swatch for border + text.
const chipSx = (category, filled) => {
  const c = catColor(categorySlugs[category]);
  return filled
    ? { bgcolor: c.main, color: c.contrastText, borderColor: c.main }
    : { color: c.main, borderColor: c.main };
};

function Glossary() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { label, categories, entries } = glossary;

  const categoryKeys = [...new Set(entries.map((e) => e.category))];

  // No useMemo: the glossary is a static handful of entries, and the React
  // Compiler memoizes this on its own (the manual memo actually blocked it).
  const lower = search.toLowerCase();
  const filtered = entries
    .filter((entry) => {
      const matchesSearch =
        !search ||
        entry.term.toLowerCase().includes(lower) ||
        (entry.fullName && entry.fullName.toLowerCase().includes(lower)) ||
        entry.definition.toLowerCase().includes(lower);
      const matchesCategory =
        !selectedCategory || entry.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => a.term.localeCompare(b.term, "es"));

  return (
    <div>
      <hr style={{ maxWidth: "initial" }} />

      <Box sx={{ mb: 1 }}>
        <Typography variant="h1">{label.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {label.subtitle}
        </Typography>
      </Box>

      <TextField
        fullWidth
        size="small"
        placeholder={label.searchPlaceholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 2, mt: 1 }}
      />

      <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mb: 2 }}>
        {categoryKeys.map((catKey) => (
          <Chip
            key={catKey}
            label={categories[catKey]}
            size="small"
            sx={chipSx(catKey, selectedCategory === catKey)}
            variant={selectedCategory === catKey ? "filled" : "outlined"}
            onClick={() =>
              setSelectedCategory(selectedCategory === catKey ? null : catKey)
            }
          />
        ))}
      </Box>

      {filtered.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: "center", mt: 4 }}
        >
          {label.noResults}
        </Typography>
      )}

      {filtered.map((entry) => (
        <Accordion
          key={entry.term}
          sx={{
            mb: 1,
            "&:before": { display: "none" },
            boxShadow: 1,
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                {entry.term}
              </Typography>
              {entry.fullName && (
                <Typography variant="body2" color="text.secondary">
                  — {entry.fullName}
                </Typography>
              )}
              <Chip
                label={categories[entry.category]}
                size="small"
                sx={chipSx(entry.category, false)}
                variant="outlined"
              />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: entry.definition }}
            />
            {entry.link && (
              <Button
                href={entry.link}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                size="small"
                startIcon={<OpenInNewIcon />}
                sx={{ mt: 1 }}
              >
                Abrir enlace
              </Button>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default Glossary;
