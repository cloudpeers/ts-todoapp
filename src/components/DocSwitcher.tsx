import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import PersonIcon from '@mui/icons-material/Person'
import AddIcon from '@mui/icons-material/Add'
import { blue } from '@mui/material/colors'

export interface SimpleDialogProps {
  open: boolean
  selectedValue: string
  onClose: (value: string) => void
  values: string[]
  addDoc: () => void
}

export default function DocSwitcher(props: SimpleDialogProps) {
  const { onClose, selectedValue, open, values, addDoc } = props

  return (
    <Dialog onClose={() => onClose(selectedValue)} open={open}>
      <DialogTitle>Choose Document</DialogTitle>
      <List sx={{ pt: 0 }}>
        {values.map((v) => (
          <ListItem button onClick={() => onClose(v)} key={v}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={v} />
          </ListItem>
        ))}
        <ListItem autoFocus button onClick={addDoc}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add Document" />
        </ListItem>
      </List>
    </Dialog>
  )
}
