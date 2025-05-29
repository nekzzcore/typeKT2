abstract class Publisher {
    constructor(
        public title: string,
        public author: string,
        public pubYear: number,
        public copies: number
    ) { }

    getTitle(): string {
        return this.title;
    }

    setTitle(newTitle: string): void {
        this.title = newTitle;
    }

    getAuthor(): string {
        return this.author;
    }

    setAuthor(newAuthor: string): void {
        this.author = newAuthor;
    }

    getPubYear(): number {
        return this.pubYear;
    }

    setPubYear(newPubYear: number): void {
        this.pubYear = newPubYear;
    }

    getCopies(): number {
        return this.copies;
    }

    setCopies(newCopies: number): void {
        this.copies = newCopies;
    }

    abstract displayInfo(): void;
}

interface Reception {
    delivery(reader: Reader): void;
    receive(reader: Reader): void;
}

class Book extends Publisher implements Reception {
    constructor(
        title: string,
        author: string,
        pubYear: number,
        copies: number,
        public pages: number
    ) {
        super(title, author, pubYear, copies);
    }

    delivery(reader: Reader): void {
        if (this.getCopies() > 0 && reader.items.length < 5) {
            this.setCopies(this.getCopies() - 1);
            reader.items.push(this);
            console.log(Книга "${this.getTitle()}" выдана читателю ${reader.firstName} ${reader.lastName});
        } else {
            console.log(Книга "${this.getTitle()}" не может быть выдана.);
        }
    }

    receive(reader: Reader): void {
        const index = reader.items.indexOf(this);
        if (index > -1) {
            this.setCopies(this.getCopies() + 1);
            reader.items.splice(index, 1);
            console.log(Книга "${this.getTitle()}" возвращена читателем ${reader.firstName} ${reader.lastName});
        } else {
            console.log(Книга "${this.getTitle()}" не найдена у читателя.);
        }
    }

    displayInfo(): void {
        console.log(Книга: ${this.title}, Автор: ${this.author}, Год: ${this.pubYear}, Страницы: ${this.pages}, Кол-во: ${this.copies});
    }
}

class Magazine extends Publisher implements Reception {
    constructor(
        title: string,
        author: string,
        pubYear: number,
        copies: number,
        public issue: number
    ) {
        super(title, author, pubYear, copies);
    }
