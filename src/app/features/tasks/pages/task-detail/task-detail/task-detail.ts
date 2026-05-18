import { Component, inject, OnInit, ChangeDetectorRef} from '@angular/core';
import { TaskApi } from '../../../services/task-api';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.scss',
})
export class TaskDetail implements OnInit{
  private api = inject(TaskApi);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  
  titulo: string = "";
  descripcion: string = "";
  estatus: string = "";

  /*ngOnInit(){ds
    console.log("Id: "+this.id);
    this.api.getById(Number(this.id)).subscribe({
      next:(data)=>{
        console.log(data);
        this.titulo = data.title;
        this.descripcion = data.description;
        this.estatus = data.status;
      },
    });
  }*/

  ngOnInit() {

  const id = this.route.snapshot.paramMap.get('id');

  console.log("ID:", id);

  if (!id) {
    console.log("No se recibió id");
    return;
  }

  this.api.getById(Number(id)).subscribe({
    next: (data) => {
      console.log(data);

      this.titulo = data.title;
      this.descripcion = data.description;
      this.estatus = data.status;
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.log(err);
    }
  });
}

  regresar(){
    this.router.navigate(['/tasks']);
  }
}
