import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { AuthService } from '../../services/auth.service';
import { Article } from '../../../../typing';
import { getErrorMessage } from '../../utils/error-handler.util';
import { maxContentLength, maxTitleLength, minContentLength, minTitleLength } from '../../data/article.input.length';
import { TIMEOUTS } from '../../data/timeouts';
import { ARTICLE_FORM_LABELS } from '../../data/labels/article-form-labels.enum';

@Component({
  selector: 'app-article-form',
  standalone: false,
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.css',
})
export class ArticleFormComponent implements OnInit {
  @Input() isEditMode: boolean | undefined; // Flag to indicate if the form is for editing an article
  @Input() selectedArticle: Article | null = null;
  @Output() closeModal = new EventEmitter<void>(); // Emits event to close modal
  
  articleForm!: FormGroup;
  showCancelDialog = false; // Controls the cancel confirmation dialog
  titleErrorMessage = false; // Tooltip for title max length
  contentErrorMessage = false; // Tooltip for content max length
  labels = ARTICLE_FORM_LABELS;
  modalTitle = '';
  closeConfirmationMessage = '';
  // form validation messages
  minTitleLengthMessage = `Title must be between ${minTitleLength} - ${maxTitleLength} characters`;
  maxTitleLengthMessage = `Max ${maxTitleLength} characters allowed!`;
  minContentLengthMessage = `Title must be between ${minContentLength} - ${maxContentLength} characters`;
  maxContentLengthMessage = `Max ${maxContentLength} characters allowed!`;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    this.closeConfirmationMessage = this.isEditMode ? this.labels.closeEditConfirmationMessage : this.labels.closeCreateConfirmationMessage; // Confirmation message based on edit mode
    this.modalTitle = this.isEditMode ? this.labels.editArticleTitle : this.labels.createArticleTitle;
    this.articleForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(minTitleLength),
          Validators.maxLength(maxTitleLength),
        ],
      ],
      content: [
        '',
        [
          Validators.required,
          Validators.minLength(minContentLength),
          Validators.maxLength(maxContentLength),
        ],
      ],
      author: [{ value: currentUser, disabled: true }], // Autofilled and disabled
    });
    if (this.selectedArticle) {
      this.articleForm.patchValue({
        title: this.selectedArticle.title,
        content: this.selectedArticle.content
      });
    }
  }

  get title() {
    return this.articleForm.get('title');
  }

  get content() {
    return this.articleForm.get('content');
  }

  handleTitleInput(): void {
    if (this.title?.value.length > maxTitleLength) {
      this.titleErrorMessage = true;
      setTimeout(() => (this.titleErrorMessage = false), TIMEOUTS.formValidationErrorDisplay); // Hide after 4 seconds
      this.articleForm.patchValue({ title: this.title?.value.slice(0, maxTitleLength) }); // Prevent extra characters
    }
  }

  handleContentInput(): void {
    if (this.content?.value.length > maxContentLength) {
      this.contentErrorMessage = true;
      setTimeout(() => (this.contentErrorMessage = false), TIMEOUTS.formValidationErrorDisplay);
      this.articleForm.patchValue({
        content: this.content?.value.slice(0, maxContentLength),
      });
    }
  }

  async handleSubmitArticle(): Promise<void> {
    if (this.selectedArticle) {
      await this.editArticle(this.selectedArticle.id);
    } else {
      await this.addArticle();
    }
  }

  private async addArticle(): Promise<void> {
    if (this.articleForm.valid) {
      try {
        const articleData: Article = this.articleForm.getRawValue();
        await this.articleService.addArticle(articleData);
        alert(`Article "${articleData.title}" successfully added.`);
        this.closeModal.emit();
      } catch (error: any) {
        const message = getErrorMessage(error);
        alert(`Article creation failed with error: ${message}`);
      }
    } else {
      alert('Please fill all required fields');
    }
  }

  private async editArticle(articleId: number): Promise<void> {
    if (this.articleForm.valid) {
      try {
        const articleData: Article = this.articleForm.getRawValue();
        articleData.id = articleId;
        await this.articleService.editArticle(articleData);
        alert(`Article "${articleData.title}" successfully updated.`);
        this.closeModal.emit();
      } catch (error: any) {
        const message = getErrorMessage(error);
        alert(`Article update failed with error: ${message}`);
      }
    } else {
      alert('Please fill all required fields');
    }
  }

  attemptClose(): void {
    if (this.articleForm.dirty) {
      this.showCancelDialog = true;
    } else {
      this.closeModal.emit();
    }
  }

  confirmClose(): void {
    this.showCancelDialog = false;
    this.closeModal.emit();
  }
}
