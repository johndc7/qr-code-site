import { useState, useEffect, createRef } from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';

import QRCode from 'react-qr-code';

import captions from './captions.json';

const theme = createTheme({ palette: {mode: 'dark'} })

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: {
      xs: 2,
      lg: '5%'
    },
    alignItems: 'center'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    width: {
      xs: '90%',
      lg: '50%'
    },
    padding: 3,
    gap: 1
  },
  qrcode: {
    paddingTop: 5,
    margin: 'auto',
    padding: 0,
    maxWidth: '100%'
  },
  qrContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    padding: 1,
    maxWidth: '100%',
    backgroundColor: "white",
    textAlign: 'center'
  }
}

function saveSvg(svg){
  let uri = 'data:attachment/svg;charset=utf-8,' + encodeURIComponent(svg);

  let downloadLink = document.createElement("a");
  downloadLink.href = uri;
  downloadLink.download = "qr.svg";

  document.body.appendChild(downloadLink);
  console.log(downloadLink)
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

function App() {
  const [value, setValue] = useState();
  const [fgColor, setFgColor] = useState('#000');
  const [bgColor, setBgColor] = useState('#fff');
  const [size, setSize] = useState(275);
  const [caption, setCaption] = useState();
  const [captionClickCount, setCaptionClickCount] = useState(1);

  const codeRef = createRef();

  useEffect(() => {
    setCaption(captions[Math.floor(Math.random() * captions.length)]);
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={styles.root}>
        <Typography variant="h4">Need a QR code?</Typography>
        <Link underline="none" color="inherit" href="#" onClick={(e) => {
          e.preventDefault();
          if(captionClickCount < 5){
            setCaption(captions[Math.floor(Math.random() * captions.length)])
            setCaptionClickCount(captionClickCount + 1)
          } else
            window.location = "https://github.com/johndc7/qr-code-site#readme"
        }} variant="caption">{caption}</Link>
        <Paper elevation={3} sx={styles.paper}>
          <Paper sx={styles.qrContainer}>
            <QRCode ref={codeRef} fgColor={fgColor} bgColor={bgColor} style={styles.qrcode} size={size} value={value || window.location.href}/>
          </Paper>
          <TextField value={fgColor} onChange={e => setFgColor('#' + e.target.value.replace('#',''))} label="Foreground Color" autoComplete="none"/>
          <TextField value={bgColor} onChange={e => setBgColor('#' + e.target.value.replace('#',''))} label="Background Color" autoComplete="none"/>
          <Box>
            <Typography gutterBottom>Size</Typography>
            <Slider valueLabelDisplay="auto" min={50} max={500} value={size} onChange={e => setSize(e.target.value)} label="Size"/>
          </Box>
          <TextField multiline rows={3} onChange={e => setValue(e.target.value)} label="Value" autoComplete="none"/>
          <Button disabled={value == null || value == ''} variant="contained" onClick={() => saveSvg(codeRef.current.outerHTML)}>Save</Button>
        </Paper>
      </Box>
    </ThemeProvider>
  )
}

export default App
