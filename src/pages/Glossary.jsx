import { useState, useMemo } from "react";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";

import glossaryEs from "@data/glossary.es.yaml";
import glossaryEn from "@data/glossary.en.yaml";

const glossaries = { es: glossaryEs, en: glossaryEn };

const categoryColors = {
  Programa: "success",
  Organización: "info",
  Plataforma: "warning",
  Rol: "secondary",
  Evento: "primary",
};

function Glossary() {
  const [lang, setLang] = useState("es");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const glossary = glossaries[lang];
  const { label, categories, entries } = glossary;

  const categoryKeys = [...new Set(entries.map((e) => e.category))];

  const filtered = useMemo(() => {
    const lower = search.toLowerCase();
    return entries
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
      .sort((a, b) => a.term.localeCompare(b.term, lang));
  }, [search, selectedCategory, entries, lang]);

  return (
    <div>
      <hr style={{ maxWidth: "initial" }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 1,
        }}
      >
        <Box>
          <Typography variant="h1">{label.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {label.subtitle}
          </Typography>
        </Box>
        <ToggleButtonGroup
          value={lang}
          exclusive
          onChange={(_, v) => {
            if (v) {
              setLang(v);
              setSelectedCategory(null);
            }
          }}
          size="small"
        >
          <ToggleButton value="es" aria-label="Español">🇪🇸</ToggleButton>
          <ToggleButton value="en" aria-label="English">🇬🇧</ToggleButton>
        </ToggleButtonGroup>
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
            color={categoryColors[catKey] || "default"}
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
                color={categoryColors[entry.category] || "default"}
                variant="outlined"
              />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">{entry.definition}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default Glossary;
