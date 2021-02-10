import { Component, OnInit, Input } from '@angular/core';
import { Block } from 'src/app/models/block.model';
import { Map } from 'src/app/models/map.model';
import { BlockService } from 'src/app/services/block.service';

@Component({
  selector: 'app-block-edit',
  templateUrl: './block-edit.component.html',
  styleUrls: ['./block-edit.component.scss']
})
export class BlockEditComponent implements OnInit {
  @Input() blockToEdit : Block;
  @Input() blockIndex;
  @Input() currentMap : Map;

  constructor(private blockService: BlockService) { }

  ngOnInit(): void {
  }

  updateBlock(block: Block) {
    let blockArray = this.currentMap.blocks;
    blockArray[this.blockIndex].height = block.height;
    blockArray[this.blockIndex].width = block.width;

    this.blockService.updateBlocks(blockArray, this.currentMap.key);
  }

}
