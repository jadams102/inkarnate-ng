import { Component, Input, OnInit } from '@angular/core';
import { BlockService } from '../../services/block.service';
import { Block } from '../../models/block.model';
import { Map } from '../../models/map.model';

@Component({
  selector: 'app-block-add',
  templateUrl: './block-add.component.html',
  styleUrls: ['./block-add.component.css']
})

export class BlockAddComponent implements OnInit {
  block: Block;
  currentMapBlocks: Block[];

  @Input() currentMap: Map;

  constructor(private blockService: BlockService) { }

  ngOnInit() {
    this.currentMapBlocks = this.currentMap.blocks;
    console.log(this.currentMap);
  }

  addBlock(height: number, width: number) {
    this.block = new Block(height, width)
    this.block.position = "transform: translate3d(796px, 334px, 0px)";
    if(this.currentMapBlocks) {
      this.currentMapBlocks.push(this.block);
      this.blockService.updateBlocks(this.currentMapBlocks, this.currentMap.key);
    } else {
      this.currentMapBlocks = [this.block];
      this.blockService.updateBlocks(this.currentMapBlocks, this.currentMap.key);
    }
  }

}
