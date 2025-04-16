import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { ReactComponent as GridIcon } from '../../assets/images/grid.svg';

registerBlockType(metadata.name, {
    icon: <GridIcon />,
    edit: Edit,
    save: Save,
});