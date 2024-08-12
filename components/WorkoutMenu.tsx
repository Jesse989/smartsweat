'use client';

import { DeleteForever, MoreHoriz } from '@mui/icons-material';
import {
  Dropdown,
  IconButton,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
} from '@mui/joy';

export default function WorkoutMenu({
  workout,
  deleteWorkout,
}: {
  workout: Workout;
  deleteWorkout: (workout: Workout) => void;
}) {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{
          root: { variant: 'plain', color: 'neutral', size: 'sm' },
        }}>
        <MoreHoriz />
      </MenuButton>
      <Menu placement="bottom-end">
        <MenuItem
          variant="soft"
          color="danger"
          onClick={() => deleteWorkout(workout)}>
          <ListItemDecorator sx={{ color: 'inherit' }}>
            <DeleteForever />
          </ListItemDecorator>
          Delete
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
