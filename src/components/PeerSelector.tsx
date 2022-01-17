import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import PersonIcon from '@mui/icons-material/Person'
import { blue } from '@mui/material/colors'
import { PeerId } from '..'

type Props = {
  open: boolean
  onClose: (value?: PeerId) => void
  values: PeerId[]
}

export default function PeerSelector({ onClose, open, values }: Props) {
  return (
    <Dialog onClose={() => onClose()} open={open}>
      <DialogTitle>
        {values.length > 0 ? 'Share with Peer' : 'No peers connected'}
      </DialogTitle>
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
      </List>
    </Dialog>
  )
}
