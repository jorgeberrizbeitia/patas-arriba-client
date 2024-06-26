import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import useMediaQuery from '@mui/material/useMediaQuery';

function CornerChip({label, bgcolor, color, side}) {

  const isSmallScreen = useMediaQuery('(width > 960px)');

  const rightSideBottom = isSmallScreen ? -15 : -25; // odd position for big screen if not used

    return (
      <Box
      position="absolute"
      top={side === "left" ? -30 : "default"}
      left={side === "left" ? -65 : "default"}
      bottom={side === "left" ? "default" : rightSideBottom}
      right={side === "left" ? "default" : -70}
      p={6}
      pb={side === "left" ? 0.3 : 6}
      pt={side === "left" ? 6 : 0}
      bgcolor={bgcolor}
      color={color}
      sx={{transform: "rotate(-45deg)"}}
    >
      <Typography
        variant="caption"
      >
        {label}
      </Typography>
    </Box>
    )
}

export default CornerChip





