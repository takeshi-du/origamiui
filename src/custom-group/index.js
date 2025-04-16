import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { ReactComponent as GroupIcon } from '../../assets/images/group.svg';

registerBlockType(metadata.name, {
    icon: <GroupIcon />,
    edit: Edit,
    save: Save,
});